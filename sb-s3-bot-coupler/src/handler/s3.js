const logger = require('loglevel');
const createDependencies = require('./createDependencies');
const main = require('../event/main');
const safeAccess = require('../util/safeAccess');
const getEnVars = require('./getEnvVars');
/**
 * Parses out the S3 event object taking  out only the required information
 * @param {*} event
 */
const parseEvent = (event) => {
  const parsed = safeAccess(['Records', 0, 's3'], event);
  if (!parsed) throw new Error('Invalid event payload');
  return parsed;
};


/**
 * Main lambda handler
 */
exports.handler = async (event) => {
  try {
    const dependencies = createDependencies(getEnVars());
    const request = parseEvent(event);
    return main(dependencies, request);
  } catch (e) {
    logger.error(e);

    // We resolve here so the lambda doesn't retry
    return Promise.resolve();
  }
};
