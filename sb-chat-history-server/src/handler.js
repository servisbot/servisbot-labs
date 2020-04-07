const App = require('./app');

const createEnvironment = require('./app/util/environment');
const createDependencies = require('./app/util/dependencies');

//  Initialize the main express application
module.exports = async () => {
  const env = createEnvironment();
  const deps = createDependencies({ env });
  const { connectionPool, logger, Database } = deps;
  const connectedPool = await connectionPool.connect();
  logger.info('Initializing the main application');
  const db = new Database({ connectionPool: connectedPool, logger });
  App({ deps: { ...deps, db }, env });
};
