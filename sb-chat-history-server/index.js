const handler = require('./src/handler');

const initApp = async () => {
  try {
    await handler();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err); // have to use console to egress initialisation error message
    process.exit(1);
  }
};
initApp();
