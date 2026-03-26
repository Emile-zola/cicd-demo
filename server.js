const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3000;
 
app.use(express.json());
 
// Route principale
app.get('/', (req, res) => {
  res.json({
    message : 'CI/CD Demo API',
    version : process.env.APP_VERSION || '1.0.0',
    status  : 'running',
  });
});
 
// Route de santé (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
 
// Route de calcul (pour tester)
app.get('/add/:a/:b', (req, res) => {
  const result = parseInt(req.params.a) + parseInt(req.params.b);
  res.json({ result });
});
 
// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
 
module.exports = { app, server };
