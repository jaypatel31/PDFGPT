const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    legacyCreateProxyMiddleware(
      [
       '/api/pdf/pdfupload',
       "/api/chat/giverespone"
      ],
      {
        target: "https://pdfgpt-ud15.onrender.com",
      }
    )
  );
};
