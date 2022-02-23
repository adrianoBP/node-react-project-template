const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const controllersIndex = require('./controllers/index');

app.use(bodyParser.json({ extended: false }));
app.use('/api', controllersIndex);

const clientBuildPath = path.join(__dirname, './client/build');
app.use(express.static(clientBuildPath));
app.get('*', (_, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

module.exports = app;
