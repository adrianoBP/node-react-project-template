// ! NodeJS unit testing

// TODO: make API call to backend (CORS)
// TODO: define PR structure including how to merge
// TODO: local vs production environment + environment variables
// TODO: do not merge if PR errors on workflow
// TODO: actions for branch naming convention
// TODO: action for commit messages
// TODO: automatic documentation
// TODO: SSL keys path in .env

// TODO: MongoDB deployment + connection

// ? Investigate commit message stiles
// ? Investigate branch naming styles
// ? Investigate React routes

require('dotenv').config();
const fs = require('fs');
const https = require('https');
const app = require('./app');

const PORT = process.env.PORT || 4000;

if (process.env?.IS_PROD === 'true') {
  // * If production, load SSL certificates
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
