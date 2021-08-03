const createProxyMiddleware = require('http-proxy-middleware');
// const app = express();

module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/*',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // changeOrigin: true,
    })
  );
};