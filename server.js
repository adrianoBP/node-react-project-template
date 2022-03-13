// TODO: make API call to backend (CORS)
// TODO: do not merge if PR errors on workflow
// TODO: actions for branch naming convention
// TODO: action for commit messages
// TODO: automatic documentation
// TODO: SSL keys path in .env

// TODO: MongoDB deployment + connection

// ? Mock DB for tests: https://www.youtube.com/watch?v=IDjF6-s1hGk
// ? Dependency Injection: https://www.youtube.com/watch?v=yOC0e0NMZ-E

// ? Investigate commit message stiles
// ? Investigate branch naming styles
// ? Investigate React routes

import dotenv from 'dotenv';
import startServer from './app.js';
import fs from 'fs';
import https from 'https';

dotenv.config();

const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.IS_PROD === 'true';
const CLIENT_FOLDER = new URL('client/build', import.meta.url).pathname;

const app = startServer(CLIENT_FOLDER, IS_PROD);

if (IS_PROD) {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/t1.adrianobp.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/t1.adrianobp.dev/cert.pem'),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
