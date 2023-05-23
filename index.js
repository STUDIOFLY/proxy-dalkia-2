const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

const dalkiaProxy = createProxyMiddleware({
  target: 'https://pivision.dalkia.fr',
  changeOrigin: true,
  pathRewrite: { '^/dalkia': '' },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['X-Frame-Options'] = 'ALLOW-FROM https://www.studiofly.fr';
  },
});

app.use('/dalkia', dalkiaProxy);
app.listen(port, () => console.log(`Dalkia proxy server listening on port ${port}`));
