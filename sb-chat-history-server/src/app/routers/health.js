//  External dependencies
const Express = require('express');

const Health = ({ deps }) => {
  const { logger, db } = deps;
  const router = Express.Router({ mergeParams: true });

  router.all('/', async (req, res, next) => {
    try {
      logger.info('Handling health check');
      const response = await db.health();
      return res.json(response);
    } catch (_err) {
      logger.error('Error handling request');
      logger.error(_err);
      return next(_err, req, res);
    }
  });

  return router;
};

module.exports = Health;
