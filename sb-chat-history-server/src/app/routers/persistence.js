//  External dependencies
const Express = require('express');
//  Internal libraries
const PersistenceController = require('../controllers/persistence');
const validate = require('../validation/validate');

const MYSQL_DUPLICATE_ERROR_CODE = 'ER_DUP_ENTRY';
const MSSQL_DUPLICATE_ERROR_CODE = 2627;

const DUPLICATE_ERROR_MESSAGE = 'Duplicate entry';

//  Router that handles requests to the /request route
const Persistence = ({ deps, env }) => {
  const { logger, schema } = deps;
  const router = Express.Router({ mergeParams: true });

  router.post('/', async (req, res, next) => {
    try {
      logger.debug('Handling request to the v1/persist/ endpoint');
      const { body } = req;
      validate(body, schema);
      logger.debug('Request body', JSON.stringify(body));
      await PersistenceController({ deps, env }).persist(body);
      return res.status(200).send();
    } catch (_err) {
      logger.error('Error handling request');
      logger.error(_err);

      if (_err.code === MYSQL_DUPLICATE_ERROR_CODE || _err.number === MSSQL_DUPLICATE_ERROR_CODE) {
        logger.info('Duplicate item found');
        return res.status(409).send({ error: DUPLICATE_ERROR_MESSAGE });
      }
      return next(_err, req, res);
    }
  });

  return router;
};

module.exports = Persistence;
