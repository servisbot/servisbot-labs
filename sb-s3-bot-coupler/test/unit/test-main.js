const main = require('../../src/event/main');
const sampleEvent = require('../fixtures/data/s3Event');
const createDependencies = require('../fixtures/helpers/createDependencies');

describe('Unit: Main', () => {
  it('It should call main with valid payload and resolve', async () => {
    const dependencies = createDependencies();
    const { fetch } = dependencies;

    fetch.addRoute({
      method: 'POST',
      headers: {
        Authorization: 'SERVISBOT_WEBHOOK_API_KEY',
        'Content-type': 'application/json'
      },
      body: {
        Type: 'message',
        Value: 'this is the body\n',
        Context: { emailSubject: 'this is a subject', emailAddress: 'test@servisbot.com' },
        CustomerReference: 'test@servisbot.com:::this is a subject'
      },
      url: 'SERVISBOT_WEBHOOK_URL',
      responseBody: {},
      responseStatus: 200
    });

    await main(dependencies, sampleEvent);
  });
});
