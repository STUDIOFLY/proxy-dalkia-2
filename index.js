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

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Remplacez cette ligne par le code approprié pour votre application
});

app.listen(port, () => {
  console.log(`Dalkia proxy server listening on port ${port}`);
});
