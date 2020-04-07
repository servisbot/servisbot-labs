
const Express = require('express');
const transcriptController = require('../controllers/transcript');


const Transcript = ({ deps, env }) => {
  const { logger } = deps;
  const router = Express.Router({ mergeParams: true });

  router.get('/', async (req, res, next) => {
    logger.info('Handling request to the v1/transcript endpoint');
    const { params } = req;
    try {
      const response = await transcriptController({ deps, env }).getTranscript(params);
      return res.json(response);
    } catch (err) {
      logger.error(err);
      return next(err, req, res);
    }
  });

  return router;
};

module.exports = Transcript;
