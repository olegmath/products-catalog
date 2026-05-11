const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function readEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return {};

  return fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return env;

      const separator = trimmed.indexOf("=");
      if (separator === -1) return env;

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
      env[key] = value;
      return env;
    }, {});
}

function adminToken() {
  const token = readEnv().SOHO_API_TOKEN_ADMIN || "";
  return token.trim().replace(/\.$/, "");
}

function send(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
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

async function graphQLRequest(query, variables) {
  const token = adminToken();
  if (!token) {
    throw new Error("SOHO_API_TOKEN_ADMIN не задан в .env");
  }

  const result = await fetch("https://api.soholms.com/master/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await result.json().catch(() => ({}));
  if (!result.ok || data.errors?.length) {
    throw new Error(data.errors?.[0]?.message || `SOHO GraphQL error ${result.status}`);
  }
  return data.data;
}

function orderPosition(course) {
  return {
    catalogItemId: course.productId,
    fieldValues: [
      {
        fieldId: -1808,
        fieldName: "Поток",
        optionName: "Без потока",
        optionValue: String(course.flowId),
        isSelected: true,
        parents: null,
        extraPay: 0,
        extraWork: 0,
        extraPayPercentage: 0,
        extraWorkPercentage: 0,
      },
    ],
    name: course.name,
    price: course.price,
    quantity: 1,
    usedCapacity: 1,
  };
}

async function addMasterOrder(payload) {
  const query = `
    mutation AddOrderMutation($input: AddOrderInput!) {
      addOrder(input: $input) {
        order {
          uid
          price
          paymentUrl
          transactions {
            uid
            amountPlanned
            paymentStatus
          }
          positions {
            catalogItemId
            name
            price
          }
        }
      }
    }
  `;

  const data = await graphQLRequest(query, {
    input: {
      isSupervised: false,
      dryRunByOrderId: null,
      patch: {
        clientId: payload.clientId,
        customerId: payload.customerId || payload.clientId,
        price: payload.price,
        notes: payload.comment,
        positions: payload.courses.map(orderPosition),
      },
    },
  });

  return data.addOrder.order;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/order" && request.method === "POST") {
    readJson(request)
      .then(addMasterOrder)
      .then((order) => send(response, 200, JSON.stringify({ order }), "application/json; charset=utf-8"))
      .catch((error) => send(response, 500, JSON.stringify({ error: error.message }), "application/json; charset=utf-8"));
    return;
  }

  if (url.pathname === "/api/config") {
    const env = readEnv();
    send(
      response,
      200,
      `window.SOHO_API_TOKEN = ${JSON.stringify(env.SOHO_API_TOKEN || "")};\n`,
      "text/javascript; charset=utf-8",
    );
    return;
  }

  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(root, pathname));

  if (!filePath.startsWith(root)) {
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
