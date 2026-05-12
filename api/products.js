const soho = require("../lib/soho");

module.exports = async (request, response) => {
  const turnstileSiteKey = soho.turnstileSiteKey();
  if (!soho.isConfigured()) {
    response.status(200).json({ configured: false, products: [], turnstileSiteKey });
    return;
  }
  try {
    const products = await soho.getProducts();
    response.status(200).json({ configured: true, products, turnstileSiteKey });
  } catch {
    response.status(502).json({ error: "Не удалось загрузить пакеты" });
  }
};
