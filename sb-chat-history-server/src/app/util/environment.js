const assert = require('assert');
const fs = require('fs');


//  Creates environment variables for the main application
const createEnvironment = () => {
  const env = {
    APP_PORT: 8080,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DOMAIN: process.env.DB_DOMAIN || '',
    DB_NAME: 'ServisbotChatHistory',
    DB_PORT: process.env.DB_PORT,
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 10,
    APP_VERSION: process.env.APP_VERSION,
    DB_IMPLEMENTATION: process.env.DB_IMPLEMENTATION,
  };

  Object.keys(env).forEach((key) => {
    assert.notStrictEqual(env[key], undefined, `ENV VAR ${key} is not set`);
  });

  const versions = fs.readdirSync(`${__dirname}/../versions/`);
  assert(versions.includes(env.APP_VERSION), `invalid APP_VERSION supplied : ${env.APP_VERSION}`);

  const supportedDbsInV1 = fs.readdirSync(`${__dirname}/../versions/v1/`);
  assert(supportedDbsInV1.includes(env.DB_IMPLEMENTATION), `invalid DB_IMPLEMENTATION supplied: ${env.DB_IMPLEMENTATION}`);
  return env;
};

module.exports = createEnvironment;
