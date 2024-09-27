const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/Reports/BalanceSheet",
    createProxyMiddleware({
      target: "http://localhost:3000/api.xro/2.0",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
