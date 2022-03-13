import express from 'express';
import router from './controllers/index.js';

export default function startServer(clientFolder, isProd) {
  const app = express();
  app.use(express.json());
  app.use('/api', router);

  // We must check for string value as .env should only contain strings
  if (isProd) {
    // Host client build as static files
    if (clientFolder) app.use(express.static(clientFolder));
    // TODO: add SSL certificates
  }

  return app;
}
