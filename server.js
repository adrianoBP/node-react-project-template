// ! NodeJS unit testing
// ! TLS

// TODO: make API call to backend (CORS)
// TODO: define PR structure including how to merge
// TODO: local vs production environment + environment variables
// TODO: do not merge if PR errors on workflow
// TODO: actions for branch naming convention
// TODO: action for commit messages
// TODO: automatic documentation

// TODO: MongoDB deployment + connection

// ? Investigate commit message stiles
// ? Investigate branch naming styles
// ? Investigate React routes

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const indexControllers = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: false }));

const clientBuildPath = path.join(__dirname, './client/build');

app.use('/api', indexControllers);

app.use(express.static(clientBuildPath));
app.get('*', (_, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

if (process.env?.IS_DEV) {
  // * In development, don't load SSL certificates
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} else {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/t1.adrianobp.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/t1.adrianobp.dev/cert.pem'),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
