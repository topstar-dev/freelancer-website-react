const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/apicall',
        createProxyMiddleware({
            target: process.env.REACT_APP_BASE_URL,
            secure: false,
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
                "^/apicall": ""
            }
        })
    );
};