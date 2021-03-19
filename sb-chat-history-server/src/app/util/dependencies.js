//  External dependencies
const logger = require('loglevel');
const assert = require('assert');

const parseMessages = require('../util/parseMessages');

const loadDatabaseClient = (dbImplementation) => {
  switch (dbImplementation) {
    case 'MYSQL':
      return require('mysql');
    case 'MSSQL':
      return require('mssql');
    case 'ORACLE':
      return require('oracledb');
    default:
      throw new Error('Unsupported DB_IMPLEMENTATION')
  }
}
//  Create the required dependencies for the main application
const createDependencies = ({ env }) => {
  logger.setLevel(process.env.LOG_LEVEL || 'info');
  const { APP_VERSION, DB_IMPLEMENTATION } = env;
  // We want to load in required schema and queryLib for the app
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const schema = require(`../versions/${APP_VERSION}/schema`);
  assert.ok(schema, 'Database Schema should be provided');
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const queryLib = require(`../versions/${APP_VERSION}/${DB_IMPLEMENTATION}/queries`);
  assert.ok(queryLib, `Could not load DB queries for DB_IMPLEMENTATION of ${DB_IMPLEMENTATION}`);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const ConnectionPool = require(`../../lib/${DB_IMPLEMENTATION}/poolManager`);
  assert.ok(ConnectionPool, `Could not load DB Pool Manager for DB_IMPLEMENTATION of ${DB_IMPLEMENTATION}`);

  const databaseImplementation = loadDatabaseClient(DB_IMPLEMENTATION);
  assert(databaseImplementation, `Could not find database implementation for ${DB_IMPLEMENTATION}`);
  const connectionPool = new ConnectionPool(env, databaseImplementation);

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const Database = require(`../../lib/${DB_IMPLEMENTATION}/database`);
  return {
    logger,
    connectionPool,
    Database,
    schema,
    queryLib,
    parseMessages,
  };
};

module.exports = createDependencies;
