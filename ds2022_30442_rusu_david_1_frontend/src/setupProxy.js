const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: process.env.backendIP || "http://int32.duckdns.org:3000/",
      changeOrigin: true,
    })
  );
};