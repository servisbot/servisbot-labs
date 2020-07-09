const assert = require('assert');


module.exports = () => {
  const env = {
    SERVISBOT_WEBHOOK_API_KEY: process.env.SERVISBOT_WEBHOOK_API_KEY,
    SERVISBOT_WEBHOOK_URL: process.env.SERVISBOT_WEBHOOK_URL,
  };

  Object.keys(env).forEach((key) => {
    assert.notStrictEqual(env[key], undefined, `ENV VAR ${key} is not set`);
  });
  if (process.env.LOG_LEVEL) env.LOG_LEVEL = process.env.LOG_LEVEL;
  return env;
};
