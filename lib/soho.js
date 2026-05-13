// All SOHO LMS communication lives here, server-side only.
// The browser never sees a SOHO token — it talks to /api/products and /api/order.

const SOHO_REST = "https://api.soholms.com/api/v1";
const SOHO_GQL = "https://api.soholms.com/master/graphql";

const TARGET_FLOW_ID = 34749;
const TARGET_PRODUCT_NAME = 'Интенсив "Постойнное Повторение"';
const LICEIST_PRODUCT_ID = 1831795;

// Price catalog for products with known IDs (SOHO flow 34749 "Постойнное Повторение").
// New SOHO products not listed here fall back to a sanity range check (see validateCourses).
const PRICE_CATALOG = {
  1827520: 5500, // Математика ЕГЭ - Джентльмен
  1827521: 6500, // Математика ЕГЭ - 100бальник
  1827522: 5500, // Русский ЕГЭ
  1827523: 5500, // Информатика ЕГЭ
  1827524: 5500, // Физика ЕГЭ
  1827525: 3000, // История ЕГЭ
  1827526: 4000, // Обществознание ЕГЭ
  1827527: 3000, // Информатика ОГЭ
  1827528: 5500, // Математика ОГЭ
  1827529: 4000, // Русский язык ОГЭ
  1827530: 3000, // Обществознание ОГЭ
  1827531: 3000, // Физика ОГЭ
  [LICEIST_PRODUCT_ID]: 5500, // Математика ЕГЭ "Лицеист"
};

const PROMO_CODES = {
  // нет активных промокодов
};

const MAX_TOTAL_PRICE = 150000;

// Thrown when the Yandex SmartCaptcha check fails — handlers turn it into a 400 with a user message.
class TurnstileError extends Error {}

function turnstileSiteKey() {
  return (process.env.SMARTCAPTCHA_SITE_KEY || "").trim();
}

function turnstileSecret() {
  return (process.env.SMARTCAPTCHA_SECRET_KEY || "").trim();
}

// No-op when SMARTCAPTCHA_SECRET_KEY is unset (local dev) — otherwise verifies the token with Yandex SmartCaptcha.
// Per Yandex docs: HTTP errors and network failures should be treated as success to avoid blocking users
// on SmartCaptcha outages.
async function verifyTurnstile(token, remoteIp) {
  const secret = turnstileSecret();
  if (!secret) return;
  if (!token || typeof token !== "string") return;
  const body = new URLSearchParams({ secret, token });
  if (remoteIp) body.set("ip", remoteIp);
  let data = {};
  try {
    const res = await fetch("https://smartcaptcha.cloud.yandex.ru/validate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return;
    data = await res.json().catch(() => ({}));
  } catch {
    return;
  }
  if (data.status !== "ok") throw new TurnstileError("captcha failed");
}

function restToken() {
  return (process.env.SOHO_API_TOKEN || "").trim();
}

function adminToken() {
  return (process.env.SOHO_API_TOKEN_ADMIN || "").trim().replace(/\.$/, "");
}

function isConfigured() {
  return Boolean(restToken() && adminToken());
}

async function sohoRest(path, body) {
  const token = restToken();
  if (!token) throw new Error("SOHO_API_TOKEN не задан в окружении");

  const result = await fetch(`${SOHO_REST}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await result.json().catch(() => ({}));
  if (!result.ok) {
    const error = new Error(data?.error?.message || data?.message || `SOHO REST error ${result.status}`);
    error.data = data;
    throw error;
  }
  return data;
}

async function sohoGql(query, variables) {
  const token = adminToken();
  if (!token) throw new Error("SOHO_API_TOKEN_ADMIN не задан в окружении");

  const result = await fetch(SOHO_GQL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ query, variables }),
  });
  const data = await result.json().catch(() => ({}));
  if (!result.ok || data.errors?.length) {
    throw new Error(data.errors?.[0]?.message || `SOHO GraphQL error ${result.status}`);
  }
  return data.data;
}

// --- products -------------------------------------------------------------

async function getProducts() {
  const data = await sohoRest("/product/list");
  if (!Array.isArray(data.products)) return [];
  return data.products.filter((item) => {
    const name = String(item.name || "");
    return (
      Number(item.flowId) === TARGET_FLOW_ID &&
      (name.includes(TARGET_PRODUCT_NAME) || /Лицеист/i.test(name) || Number(item.productId) === LICEIST_PRODUCT_ID)
    );
  });
}

// --- input validation -----------------------------------------------------

function normalizeName(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function isFullName(value) {
  return /^[А-ЯЁа-яё]+ [А-ЯЁа-яё]+$/.test(normalizeName(value));
}

function splitName(value) {
  const [lastName, firstName] = normalizeName(value).split(" ");
  return { firstName, lastName };
}

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length !== 11 || !/^[78]/.test(digits)) return "";
  return `7${digits.slice(1)}`;
}

function validatePerson(person, label) {
  const name = normalizeName(person?.name);
  const phone = normalizePhone(person?.phone);
  if (!isFullName(name)) throw new Error(`Некорректное имя (${label})`);
  if (!phone) throw new Error(`Некорректный телефон (${label})`);
  return { name, phone };
}

function validateCourses(courses) {
  if (!Array.isArray(courses) || courses.length === 0 || courses.length > 20) {
    throw new Error("courses must be a non-empty array");
  }
  return courses.map((c) => {
    const productId = Number(c.productId);
    const flowId = Number(c.flowId);
    if (!Number.isInteger(productId) || productId <= 0) throw new Error("Bad productId");
    if (!Number.isInteger(flowId) || flowId < 0) throw new Error("Bad flowId");

    // Only catalog products can be ordered — the client-supplied price is never trusted.
    const price = PRICE_CATALOG[productId];
    if (price === undefined) throw new Error(`Unknown productId: ${productId}`);

    const name = String(c.name || "Интенсив").slice(0, 200);
    return { productId, flowId, price, name };
  });
}

function computeTotal(courses, promoCode) {
  const subtotal = courses.reduce((sum, c) => sum + c.price, 0);
  if (subtotal > MAX_TOTAL_PRICE) throw new Error("Total exceeds maximum allowed amount");
  const rate = PROMO_CODES[String(promoCode || "").toUpperCase().trim()] || 0;
  return subtotal - Math.round(subtotal * rate);
}

// --- client creation ------------------------------------------------------

function clientIdFromResponse(data) {
  return (
    data?.clientId || data?.id || data?.client?.clientId || data?.client?.id || data?.data?.clientId || data?.data?.id
  );
}

function clientIdFromMessage(message) {
  const match = String(message).match(/\/crm\/clients\/(\d+)/);
  return match ? Number(match[1]) : 0;
}

async function createClient(person, role) {
  const { firstName, lastName } = splitName(person.name);
  try {
    const client = await sohoRest("/client/add_client", { firstName, lastName, phones: [person.phone] });
    const clientId = clientIdFromResponse(client);
    if (!clientId) throw new Error(`SOHO.LMS создал клиента (${role}), но не вернул clientId.`);
    return clientId;
  } catch (error) {
    const existing = clientIdFromMessage(error.message);
    if (existing) return existing;
    throw error;
  }
}

// --- order creation -------------------------------------------------------

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

async function addMasterOrder({ clientId, customerId, price, courses, comment }) {
  const query = `
    mutation AddOrderMutation($input: AddOrderInput!) {
      addOrder(input: $input) {
        order {
          uid
          price
          paymentUrl
          transactions { uid amountPlanned paymentStatus }
          positions { catalogItemId name price }
        }
      }
    }
  `;
  const data = await sohoGql(query, {
    input: {
      isSupervised: false,
      dryRunByOrderId: null,
      patch: {
        clientId,
        customerId: customerId || clientId,
        price,
        notes: comment,
        positions: courses.map(orderPosition),
      },
    },
  });
  return data.addOrder.order;
}

// --- public: full checkout ------------------------------------------------

async function checkout(payload, remoteIp) {
  await verifyTurnstile(payload?.turnstileToken, remoteIp);
  const courses = validateCourses(payload?.courses);
  const promoCode = String(payload?.promoCode || "");
  const price = computeTotal(courses, promoCode);
  const parent = validatePerson(payload?.parent, "родитель");
  const student =
    payload?.student && (payload.student.name || payload.student.phone)
      ? validatePerson(payload.student, "ученик")
      : parent;

  const parentClientId = await createClient(parent, "родитель");
  const sameClient = parent.name === student.name && parent.phone === student.phone;
  const studentClientId = sameClient ? parentClientId : await createClient(student, "ученик");

  const comment = [
    "Единая оплата выбранных пакетов",
    `Пакеты: ${courses.map((c) => c.name).join("; ")}`,
    `Родитель: ${parent.name}, +${parent.phone}, clientId ${parentClientId}`,
    `Ученик: ${student.name}, +${student.phone}, clientId ${studentClientId}`,
    "Способ оплаты: СБП",
  ].join("\n");

  const order = await addMasterOrder({ clientId: parentClientId, customerId: studentClientId, price, courses, comment });
  const orderId = order.uid || order.orderId || 0;

  let paymentUrl = order.paymentUrl || order.payments?.find((p) => p.paymentUrl)?.paymentUrl;
  if (!paymentUrl) {
    const payment = await sohoRest("/order/payment/add", {
      orderId,
      amount: order.price ?? price,
      deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      comment: "Консолидированный платёж за выбранные курсы",
    });
    paymentUrl = payment.paymentUrl;
  }
  if (!paymentUrl) throw new Error("SOHO.LMS создал заказ, но не вернул ссылку на оплату.");

  return { orderId, paymentUrl };
}

function mockCheckout() {
  return {
    orderId: Math.floor(100000 + Math.random() * 900000),
    paymentUrl: "https://pay.example.com/soho-demo-checkout",
  };
}

module.exports = { isConfigured, getProducts, checkout, mockCheckout, turnstileSiteKey, TurnstileError };
