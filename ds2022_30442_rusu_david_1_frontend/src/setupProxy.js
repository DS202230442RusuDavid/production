const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.backendIP || "http://localhost:3000",
      changeOrigin: true,
    })
  );
};