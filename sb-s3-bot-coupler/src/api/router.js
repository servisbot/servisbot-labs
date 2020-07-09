const Express = require('express');

module.exports = (logger) => {
  const app = Express();
  app.use(Express.json());

  app.post('/HandleBotResponse', async (req, res, err) => {
    try {
      logger.setDefaultLevel('INFO');
      const { body } = req;
      const {
        Markdown, Messages, CustomerReference, HostNotification
      } = body;

      const [email, subject] = CustomerReference.split(':::');
      if (Markdown) {
        Markdown.forEach((markdown) => {
          logger.info(`I got back the following message for email "${email}" and subject "${subject}"`);
          logger.info(JSON.stringify(markdown, null, 2));
        });
      }
      if (Messages) {
        logger.info(`I got back the following message for email "${email}" and subject "${subject}"`);

        Messages.forEach((message) => { logger.info(message); });
      }
      if (HostNotification) {
        logger.info(`I got back the following HostNotification for email "${email}" and subject "${subject}"`);
        logger.info(HostNotification);
      }
      res.json({});
    } catch (e) {
      err(e);
    }
  });

  app.all('*', (req, res) => res.status(404).json({ Error: 'Command Not Found' }));

  // eslint-disable-next-line  no-unused-vars
  app.use((err, req, res, next) => {
    logger.error(err);
    const status = err.statusCode ? err.statusCode : 500;
    res.status(status).json({
      error: err.message
    });
  });
  return app;
};
