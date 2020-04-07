//  External dependencies
const Express = require('express');
const BodyParser = require('body-parser');
//  Internal libraries
const PersistenceRouter = require('./routers/persistence');
const HealthRouter = require('./routers/health');
const HistoryRouter = require('./routers/history');
const TranscriptRouter = require('./routers/transcript');

const INTERNAL_ERROR = 'An internal error occurred, please review application logs.';

//  Main express application
const App = ({ deps, env }) => {
  const { logger } = deps;
  const { APP_PORT, APP_VERSION } = env;
  const app = Express();

  //  required middleware
  logger.info('Attaching Middleware');
  app.disable('x-powered-by');
  app.use(BodyParser.json({ limit: '400kb' }));

  //  Required routers
  logger.info('Attaching Routers');
  app.use(`/${APP_VERSION}/persist`, PersistenceRouter({ deps, env }));
  app.use(`/${APP_VERSION}/ping`, HealthRouter({ deps, env }));
  app.use(`/${APP_VERSION}/history`, HistoryRouter({ deps, env }));
  app.use(`/${APP_VERSION}/:organization/transcript/:conversationId`, TranscriptRouter({ deps, env }));

  app.get('/about', async (req, res) => {
    let ok;
    let error;
    try {
      ok = await deps.db.health();
    } catch (_err) {
      logger.error(_err);
      error = INTERNAL_ERROR;
    } finally {
      const status = (error) ? 500 : 200;
      res.status(status).json({
        error,
        ok,
        version: APP_VERSION,
      });
    }
  });
  app.use('/swagger', Express.static('swagger'));
  app.all('*', (req, res) => res.status(404).json({ error: 'Not found' }));
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // must have next to be the default error handler in express
    logger.error(err);
    if (err.isJoi) {
      return res.status(400).json({ error: err.message, code: err.code });
    }
    return res.status(500).json({ error: INTERNAL_ERROR, code: err.code });
  });
  //  Set the port the express application listens on
  app.listen(APP_PORT, () => logger.info(`App is listening on port ${APP_PORT}`));
  return app;
};

module.exports = App;
