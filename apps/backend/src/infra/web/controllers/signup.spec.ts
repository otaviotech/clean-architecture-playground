import request from 'supertest';
import { Server } from 'http';

import { appContainer } from '@main/ioc/container';
import { IHttpServer } from '@infra/web/ports';

describe('[e2e] [SignUpController]', () => {
  const appServer = appContainer.resolve<IHttpServer>('IHttpServer');
  let server: Server;

  beforeAll(async () => {
    await appServer.listen({ port: null });
    server = appServer.getServer();
  });

  afterAll(async () => {
    await appServer.stop();
  });

  describe('[InputValidation]', () => {
    it('should require valid email', async () => {
      const invalidEmail = 'invalid-email';
      const res = await request(server).post('/v1/signup').send({
        email: invalidEmail,
        username: 'username',
        password: '123456',
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        errors: [`email ${invalidEmail} is invalid`],
      });
    });

    it('should require valid username', async () => {
      const invalidUsername = 'john!doe';

      const res = await request(server).post('/v1/signup').send({
        email: 'john@doe.com',
        username: invalidUsername,
        password: '123456',
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        errors: [`username ${invalidUsername} is invalid`],
      });
    });

    it('should require valid password', async () => {
      const invalidPassword = '';

      const res = await request(server).post('/v1/signup').send({
        email: 'john@doe.com',
        username: 'johndoe',
        password: invalidPassword,
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        errors: [`field password is required`],
      });
    });

    it('should validate the input', async () => {
      const res = await request(server).post('/v1/signup').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        errors: [
          'field username is required',
          'field email is required',
          'field password is required',
        ],
      });
    });
  });

  describe('[Errors]', () => {
    it('should require unique username', async () => {
      const input = {
        username: 'user1',
        email: 'user1@email.com',
        password: '123456',
      };

      await request(server).post('/v1/signup').send(input);

      const res = await request(server).post('/v1/signup').send(input);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        errors: [`username "${input.username}" already taken`],
      });
    });
  });

  describe('[Success]', () => {
    it('should create a new account', async () => {
      const res = await request(server).post('/v1/signup').send({
        username: 'johndoe',
        email: 'johndoe@email.com',
        password: '123456',
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        username: 'johndoe',
      });
    });
  });
});
