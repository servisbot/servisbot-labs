const assert = require('assert');
const createDependencies = require('../../src/handler/createDependencies');

describe('Unit: Create Dependencies', () => {
  it('Should get back the correct dependencies', () => {
    const env = {
      SERVISBOT_WEBHOOK_API_KEY: 'SERVISBOT_WEBHOOK_API_KEY',
      SERVISBOT_WEBHOOK_URL: 'SERVISBOT_WEBHOOK_URL',
    };
    const dependencies = createDependencies(env);

    assert(dependencies.logger, 'Should contain logger');
    assert(dependencies.servisbotWebhookController, 'Should contain servisbotWebhookController');
    assert(dependencies.storage, 'Should contain storage');
    assert(dependencies.ReceivedEmail, 'Should contain ReceivedEmail');
    assert.strictEqual(dependencies.logger.getLevel(), 2);
  });

  it('Should set the correct log level', () => {
    const env = {
      SERVISBOT_WEBHOOK_API_KEY: 'SERVISBOT_WEBHOOK_API_KEY',
      SERVISBOT_WEBHOOK_URL: 'SERVISBOT_WEBHOOK_URL',
      LOG_LEVEL: 'debug'
    };
    const dependencies = createDependencies(env);

    assert(dependencies.logger, 'Should contain logger');
    assert(dependencies.servisbotWebhookController, 'Should contain servisbotWebhookController');
    assert(dependencies.storage, 'Should contain storage');
    assert(dependencies.ReceivedEmail, 'Should contain ReceivedEmail');
    assert.strictEqual(dependencies.logger.getLevel(), 1);
  });
});
