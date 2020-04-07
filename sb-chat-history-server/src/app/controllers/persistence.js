//  Internal libraries

//  Responsible for persisting
const Persistence = ({ deps }) => {
  const { logger, queryLib, db } = deps;

  const api = {
    persist: async (body) => {
      logger.info('Persisting Item to database');
      const { message } = body;
      const {
        key,
        conversationId,
        identity,
        id,
        timestamp,
        organization,
      } = message;
      logger.debug('Key', key);
      logger.debug('conversationId', conversationId);
      let query;
      const params = {
        conversationId,
        organization,
        identity,
        messageId: id,
        contents: JSON.stringify(message),
        timestamp,
        sbid: key,
      };
      if (message.contentType === 'markupInteraction') {
        query = queryLib.insertInteractionsRow();
      } else {
        query = queryLib.insertMessagesRow();
      }
      const res = await db.executeQuery(query, params);
      return res;
    },
  };
  return api;
};

module.exports = Persistence;
