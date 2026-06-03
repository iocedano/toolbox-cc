const app = require('./src/app');
require('dotenv').config();
const gracefulShutdown = require('./grateful-shutdown');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  gracefulShutdown(server);
});

process.on('SIGTERM', () => {
  gracefulShutdown(server);
});