
const Express = require('express');
const HistoryController = require('../controllers/history');


const History = ({ deps, env }) => {
  const { logger } = deps;
  const router = Express.Router({ mergeParams: true });

  router.get('/', async (req, res, next) => {
    logger.info('Handling request to the v1/history endpoint');
    const { query } = req;
    try {
      const response = await HistoryController({ deps, env }).getMessages(query);
      logger.debug('response', response);
      return res.json(response);
    } catch (err) {
      logger.error(err);
      return next(err, req, res);
    }
  });

  return router;
};

module.exports = History;
