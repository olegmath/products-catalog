const soho = require("../lib/soho");

function clientIp(request) {
  const fwd = request.headers["x-forwarded-for"];
  if (fwd) return String(fwd).split(",")[0].trim();
  return request.headers["x-real-ip"] || request.socket?.remoteAddress || "";
}

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!soho.isConfigured()) {
    response.status(200).json(soho.mockCheckout());
    return;
  }

  try {
    const result = await soho.checkout(request.body || {}, clientIp(request));
    response.status(200).json(result);
  } catch (error) {
    if (error instanceof soho.TurnstileError) {
      response.status(400).json({ error: "Подтвердите, что вы не робот, и попробуйте снова." });
      return;
    }
    // Validation errors (our own Error messages) → 400; anything else → 500 with a generic message.
    const isValidation = /Некорректн|productId|price|courses|flowId|Unknown/i.test(error.message || "");
    response.status(isValidation ? 400 : 500).json({
      error: isValidation ? "Некорректные данные заказа" : "Не удалось создать заказ. Попробуйте ещё раз.",
    });
  }
};
