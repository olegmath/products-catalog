module.exports = (request, response) => {
  const token = process.env.SOHO_API_TOKEN || "";
  response.setHeader("Content-Type", "text/javascript; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.status(200).send(`window.SOHO_API_TOKEN = ${JSON.stringify(token)};\n`);
};
