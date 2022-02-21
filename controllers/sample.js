const { Router } = require('express');

const router = new Router();

const getHelloWorld = (req, res) => {
    res.status(200).send({ message: 'Hello World' });
}

router.get('/hello-world', getHelloWorld);

module.exports = router;