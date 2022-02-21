const { Router } = require('express');
const sample = require('./sample');

const router = new Router();

router.use('/sample', sample);

module.exports = router;
