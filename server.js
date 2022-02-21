// TODO: investigate commit message styles
// TODO: investigate branches styles
// TODO: NodeJS unit testing
// TODO: local vs production environment + environment variables
// TODO: double check nodejs linting
// TODO: do not merge if PR errors on workflow
// TODO: actions for branch naming convention
// TODO: action for commit messages
// TODO: automatic documentation

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexControllers = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: false }));

const clientBuildPath = path.join(__dirname, './client/build')

app.use('/api', indexControllers);

app.use(express.static(clientBuildPath));
app.get('*', (_, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
