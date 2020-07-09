const proxyquire = require('proxyquire').noCallThru();
const clone = require('clone');
const assert = require('assert');
const sampleEvent = require('../fixtures/data/sampleEvent');

describe('Unit: s3 handler', () => {
  let handler;
  let oldEnv;
  let logs;
  beforeEach(() => {
    oldEnv = clone(process.env);
    process.env.SERVISBOT_WEBHOOK_API_KEY = 'SERVISBOT_WEBHOOK_API_KEY';
    process.env.SERVISBOT_WEBHOOK_URL = 'SERVISBOT_WEBHOOK_URL';

    logs = {
      error: []
    };
    ({ handler } = proxyquire('../../src/handler/s3', {
      '../event/main': () => ({}),
      loglevel: {
        setDefaultLevel: () => {},
        error: (message) => { logs.error.push(message); }
      }
    }));
  });

  afterEach(() => {
    process.env = oldEnv;
  });

  it('Should call the handlers with a valid event', async () => {
    process.env.LOG_LEVEL = 'debug';
    await handler(sampleEvent);
  });

  it('Should call the handlers with a valid event and throw inside of main', async () => {
    ({ handler } = proxyquire('../../src/handler/s3', {
      '../event/main': () => { throw new Error('Something descriptive happened'); },
      loglevel: {
        error: (message) => { logs.error.push(message); }
      }
    }));

    await handler(sampleEvent);
    assert.strictEqual(logs.error[0].message, 'Something descriptive happened');
  });

  it('Should call the handlers with an invalid event', async () => {
    await handler({ });
    assert.strictEqual(logs.error[0].message, 'Invalid event payload');
  });
});
