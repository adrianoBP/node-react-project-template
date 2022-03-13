import { Router } from 'express';

const router = new Router();

const getHelloWorld = (req, res) => {
  res.status(200).send({ message: 'Hello World' });
};

const getUser = (req, res) => {
  res.send(
    JSON.stringify({
      username: 'Will',
      surname: 'Smith',
    })
  );
};

const showUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ error: 'Missing username or password' });
  }

  res.send({});
};

router.get('/hello-world', getHelloWorld);
router.get('/get-user', getUser);
router.post('/show-user', showUser);

export default router;
