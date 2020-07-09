const assert = require('assert');
const ServisbotWebhookController = require('../../src/event/controllers/ServisbotWebhookController');
const FakeFetch = require('../fixtures/mocks/FetchMock');


const servisbotWebhookApiKey = 'servisbotWebhookApiKey';
const servisbotWebhookUrl = 'servisbotWebhookUrl';

describe('Unit: ServisbotWebhookController', () => {
  let fetch;

  beforeEach(() => {
    fetch = new FakeFetch();
  });

  it('Should successfully call sendEmailToBotPlatform', async () => {
    const servisbotWebhookController = new ServisbotWebhookController({
      fetch: fetch.toFunction(),
      servisbotWebhookApiKey,
      servisbotWebhookUrl
    });
    const request = {
      getSubject: () => 'some subject',
      getAddress: () => 'some email',
      getBody: () => 'some body'
    };

    fetch.addRoute({
      method: 'POST',
      headers: {
        Authorization: servisbotWebhookApiKey,
        'Content-type': 'application/json'
      },
      body: {
        Type: 'message',
        Value: request.getBody(),
        Context: { emailSubject: request.getSubject(), emailAddress: request.getAddress() },
        CustomerReference: `${request.getAddress()}:::${request.getSubject()}`
      },
      url: servisbotWebhookUrl,
      responseBody: {},
      responseStatus: 200
    });


    await servisbotWebhookController.sendEmailToBotPlatform(request);
  });

  it('Should successfully call sendEmailToBotPlatform', async () => {
    const servisbotWebhookController = new ServisbotWebhookController({
      fetch: fetch.toFunction(),
      servisbotWebhookApiKey,
      servisbotWebhookUrl
    });
    const request = {
      getSubject: () => 'some subject',
      getAddress: () => 'some email',
      getBody: () => 'some body'
    };

    fetch.addRoute({
      method: 'POST',
      headers: {
        Authorization: servisbotWebhookApiKey,
        'Content-type': 'application/json'
      },
      body: {
        Type: 'message',
        Value: request.getBody(),
        Context: { emailSubject: request.getSubject(), emailAddress: request.getAddress() },
        CustomerReference: `${request.getAddress()}:::${request.getSubject()}`
      },
      url: servisbotWebhookUrl,
      responseBody: {},
      responseStatus: 401,
      text: 'Unauthorized'
    });


    try {
      await servisbotWebhookController.sendEmailToBotPlatform(request);
      assert.fail('Should not get here');
    } catch (e) {
      assert.strictEqual(e.message, 'Got status code 401 and message: Unauthorized');
    }
  });
});
