const supertest = require('supertest');
const logger = require('loglevel');
const {
  Message,
  Markup,
  HostNotification
} = require('../fixtures/data/responseMessage');
const Router = require('../../src/api/router');

describe('Unit: api handler', () => {
  it('Should return 404 when invalid router', async () => {
    const router = Router(logger);
    const app = supertest(router);
    await app.post('/invalid')
      .send()
      .expect(404);
  });

  it('Should handle a valid message', async () => {
    const router = Router(logger);
    const app = supertest(router);
    await app.post('/HandleBotResponse')
      .send(Message)
      .expect(200);
  });
  it('Should handle a valid markup', async () => {
    const router = Router(logger);
    const app = supertest(router);
    await app.post('/HandleBotResponse')
      .send(Markup)
      .expect(200);
  });
  it('Should handle a valid HostNotification', async () => {
    const router = Router(logger);
    const app = supertest(router);
    await app.post('/HandleBotResponse')
      .send(HostNotification)
      .expect(200);
  });
  it('Should handle a invalid payload', async () => {
    const router = Router(logger);
    const app = supertest(router);
    await app.post('/HandleBotResponse')
      .send()
      .expect(500);
  });
});
