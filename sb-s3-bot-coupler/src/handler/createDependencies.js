const logger = require('loglevel');
const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const ServisbotWebhookController = require('../event/controllers/ServisbotWebhookController');
const ReceivedEmail = require('../event/requests/ReceivedEmail');
const Storage = require('../logic/storage');

/**
 * Used to setup all the dependencies for this lambda
 */
module.exports = (env) => {
  logger.setDefaultLevel(env.LOG_LEVEL || 'INFO');
  const S3 = new AWS.S3();
  const storage = new Storage({ S3 });
  const servisbotWebhookApiKey = env.SERVISBOT_WEBHOOK_API_KEY;
  const servisbotWebhookUrl = env.SERVISBOT_WEBHOOK_URL;
  const servisbotWebhookController = new ServisbotWebhookController({
    servisbotWebhookApiKey,
    servisbotWebhookUrl,
    fetch
  });

  return {
    logger,
    servisbotWebhookController,
    storage,
    ReceivedEmail
  };
};
