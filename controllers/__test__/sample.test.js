import request from 'supertest';
import startServer from '../../app.js';

const app = startServer();

describe('POST /user', () => {
  describe('given username and password', () => {
    // should save the username and password to DB
    // should respond with JSON object containing user ID

    test('should respond with 200 status code', async () => {
      const response = await request(app).post('/api/sample/show-user').send({
        username: 'username',
        password: 'password',
      });
      expect(response.statusCode).toBe(200);
    });
    test('should return JSON header', async () => {
      const response = await request(app).post('/api/sample/show-user').send({
        username: 'username',
        password: 'password',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
  });

  describe('missing username or password', () => {
    test('should respond with status code of 400', async () => {
      const response = await request(app).post('/api/sample/show-user').send({
        username: 'username',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
