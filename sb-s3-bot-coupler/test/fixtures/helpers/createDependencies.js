const logger = require('loglevel');
const FetchMock = require('../mocks/FetchMock');
const ServisbotWebhookController = require('../../../src/event/controllers/ServisbotWebhookController');
const ReceivedEmail = require('../../../src/event/requests/ReceivedEmail');
const Storage = require('../../../src/logic/storage'); // fake this
const sampleSesEmail = require('../data/sampleSesEmail');

module.exports = (env) => {
  logger.setDefaultLevel('INFO' || env.LOG_LEVEL);
  const fetchMock = new FetchMock();
  const S3 = {
    getObject: () => ({
      promise: () => ({
        Body: Buffer.from(sampleSesEmail, 'utf8')
      })
    })
  };
  const storage = new Storage({ S3 });
  const servisbotWebhookApiKey = 'SERVISBOT_WEBHOOK_API_KEY';
  const servisbotWebhookUrl = 'SERVISBOT_WEBHOOK_URL';
  const servisbotWebhookController = new ServisbotWebhookController({
    servisbotWebhookApiKey,
    servisbotWebhookUrl,
    fetch: fetchMock.toFunction()
  });

  return {
    logger,
    servisbotWebhookController,
    storage,
    ReceivedEmail,
    fetch: fetchMock
  };
};
