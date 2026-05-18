const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

// Load .env into process.env so lib/soho.js sees the tokens.
(function loadEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const sep = trimmed.indexOf("=");
    if (sep === -1) continue;
    const key = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
})();

const soho = require("./lib/soho");

// --- Rate limiting (in-memory, per IP) ------------------------------------
const rateLimitStore = new Map();

// Clean up expired entries every 5 minutes to avoid memory leak.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}, 5 * 60 * 1000).unref();

function checkRateLimit(ip, endpoint, max, windowMs) {
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

function remoteIp(request) {
  return request.socket?.remoteAddress || "unknown";
}

const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || "").trim();

function isTrustedOrigin(request) {
  if (!ALLOWED_ORIGIN) return true; // not configured — skip check in dev
  const origin = request.headers.origin || "";
  return origin === ALLOWED_ORIGIN;
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' https://smartcaptcha.cloud.yandex.ru; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://smartcaptcha.cloud.yandex.ru; frame-src https://smartcaptcha.cloud.yandex.ru; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'",
};

function send(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, { "Content-Type": contentType, "Cache-Control": "no-store", ...securityHeaders });
  response.end(body);
}

function sendJson(response, statusCode, payload) {
  send(response, statusCode, JSON.stringify(payload), "application/json; charset=utf-8");
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 16 * 1024) {
        request.destroy();
        reject(new Error("Request body is too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

async function handleProducts(request, response) {
  if (!checkRateLimit(remoteIp(request), "products", 30, 60_000)) {
    sendJson(response, 429, { error: "Слишком много запросов." });
    return;
  }
  const turnstileSiteKey = soho.turnstileSiteKey();
  if (!soho.isConfigured()) {
    sendJson(response, 200, { configured: false, products: [], turnstileSiteKey });
    return;
  }
  try {
    sendJson(response, 200, { configured: true, products: await soho.getProducts(), turnstileSiteKey });
  } catch {
    sendJson(response, 502, { error: "Не удалось загрузить пакеты" });
  }
}

async function handlePromo(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
  if (!isTrustedOrigin(request)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }
  if (!checkRateLimit(remoteIp(request), "promo", 10, 60_000)) {
    sendJson(response, 429, { error: "Слишком много запросов. Попробуйте через минуту." });
    return;
  }
  let body;
  try {
    body = await readJson(request);
  } catch {
    sendJson(response, 400, { error: "Некорректные данные" });
    return;
  }
  const discount = soho.lookupPromo(body.code);
  sendJson(response, 200, { discount });
}

async function handleOrder(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
  if (!isTrustedOrigin(request)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }
  if (!checkRateLimit(remoteIp(request), "order", 5, 60_000)) {
    sendJson(response, 429, { error: "Слишком много запросов. Попробуйте через минуту." });
    return;
  }
  if (!soho.isConfigured()) {
    sendJson(response, 200, soho.mockCheckout());
    return;
  }

  let body;
  try {
    body = await readJson(request);
  } catch {
    sendJson(response, 400, { error: "Некорректные данные заказа" });
    return;
  }

  const ip = remoteIp(request);
  try {
    sendJson(response, 200, await soho.checkout(body, ip));
  } catch (error) {
    if (error instanceof soho.TurnstileError) {
      sendJson(response, 400, { error: "Подтвердите, что вы не робот, и попробуйте снова." });
      return;
    }
    const isValidation = /Некорректн|productId|price|courses|flowId|Unknown/i.test(error.message || "");
    sendJson(response, isValidation ? 400 : 500, {
      error: isValidation ? "Некорректные данные заказа" : "Не удалось создать заказ. Попробуйте ещё раз.",
    });
  }
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/products") {
    handleProducts(request, response);
    return;
  }
  if (url.pathname === "/api/order") {
    handleOrder(request, response);
    return;
  }
  if (url.pathname === "/api/promo") {
    handlePromo(request, response);
    return;
  }

  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(root, pathname));
  const insideRoot = filePath === root || filePath.startsWith(root + path.sep);
  // Never serve dotfiles (.env, .git, …) or anything outside the project root.
  if (!insideRoot || path.basename(filePath).startsWith(".") || pathname.split("/").some((p) => p.startsWith("."))) {
    send(response, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, 404, "Not found");
      return;
    }
    send(response, 200, content, mimeTypes[path.extname(filePath)] || "application/octet-stream");
  });
});

server.listen(port, host, () => {
  console.log(`Local server: http://localhost:${port}`);
});
