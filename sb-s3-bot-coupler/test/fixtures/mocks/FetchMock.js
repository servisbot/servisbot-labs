const R = require('ramda');
const assert = require('assert');


const addDefaults = opts => R.merge({
  method: 'GET',
  body: null,
},
opts);


const isStatusCodeOk = statusCode => statusCode >= 200 && statusCode < 300;


module.exports = class FetchMock {
  constructor() {
    this.routes = [];
    this.callCount = {};
  }

  addRoute({
    method = 'GET', body = null, url, responseBody, responseStatus = 200, text
  }) {
    this.routes.push({
      method, body, url, responseBody, responseStatus, text
    });
  }

  incrementCallCountForRoute(url) {
    if (this.callCount[url]) {
      this.callCount[url] += 1;
    } else {
      this.callCount[url] = 1;
    }
  }

  assertCalledRouteExactlyOnce(url) {
    assert(this.callCount[url] === 1, 'Should have called route once');
  }

  assertCalledRouteNTimes(url, numberOfCalls) {
    assert(this.callCount[url] === numberOfCalls, `Should have called route ${numberOfCalls} times`);
  }

  toFunction() {
    return (url, opts) => {
      this.incrementCallCountForRoute(url);
      const optsWithDefaults = addDefaults(opts);
      const match = this.routes.find((r) => {
        if (r.url !== url) {
          return false;
        }

        if (r.method !== optsWithDefaults.method) {
          return false;
        }

        if (!r.body) {
          return true;
        }
        return R.equals(r.body, JSON.parse(optsWithDefaults.body));
      });
      assert(match, 'No matching routes found');

      return {
        status: match.responseStatus,
        ok: isStatusCodeOk(match.responseStatus),
        json: async () => match.responseBody,
        text: async () => match.text,
      };
    };
  }
};
