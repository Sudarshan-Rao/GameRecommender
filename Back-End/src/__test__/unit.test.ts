import app from '../server';
import supertest from 'supertest';
import { dbConnection, closeDatabase } from '../dbconnection';

describe('Test the root path', () => {
  beforeAll(async () => await dbConnection());

  afterAll(async () => await closeDatabase());
  test('It should response the GET method', async () => {
    const response = await supertest(app).get('/');
    expect(response.statusCode).toBe(200);
  });
  test('It should response to register user', async () => {
    const response = await supertest(app)
      .post('/register')
      .send({
        email:
          'test' + Math.floor(Math.random() * 10000) + '@gmail.com',
        password: 'Test@123',
        name: 'test',
      });
    expect(response.statusCode).toBe(201);
  });
  test('It should not be able to register user with same email', async () => {
    const response = await supertest(app).post('/register').send({
      email: 'Test@gmail.com',
      password: 'Test@123',
      name: 'test',
    });
    expect(response.statusCode).toBe(400);
  });
  test('It should response to login user', async () => {
    const response = await supertest(app).post('/login').send({
      email: 'Test@gmail.com',
      password: 'Test@123',
    });
    expect(response.statusCode).toBe(200);
  });
  test('It should not be able to login user with wrong password', async () => {
    const response = await supertest(app).post('/login').send({
      email: 'Test@gmail.com',
      password: 'Test@1234',
    });
    expect(response.statusCode).toBe(401);
  });
  test('It should not be able to login user with wrong email', async () => {
    const response = await supertest(app).post('/login').send({
      email: 'abcd@gmail.com',
      password: 'Test@123',
    });
    expect(response.statusCode).toBe(401);
  });
  test('It should logout user', async () => {
    const response = await supertest(app).post('/logout').send({});
    expect(response.statusCode).toBe(204);
  });
});
