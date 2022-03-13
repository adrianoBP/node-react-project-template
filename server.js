// TODO: make API call to backend (CORS)
// TODO: do not merge if PR errors on workflow
// TODO: actions for branch naming convention
// TODO: action for commit messages
// TODO: automatic documentation

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

if (IS_PROD && process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
