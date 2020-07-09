const logger = require('loglevel');

const awsServerlessExpress = require('aws-serverless-express');
const router = require('../api/router');

exports.handler = (event, context) => {
  const server = awsServerlessExpress.createServer(router(logger));
  awsServerlessExpress.proxy(server, event, context);
};
