const safeAccess = require('../util/safe-access');

const History = ({ deps, env }) => {
  const {
    logger, queryLib, db, parseMessages
  } = deps;
  const api = {
    getMessages: async (request) => {
      logger.info('Getting rows from database');
      const {
        conversationId, messageId, identity, organization
      } = request;
      logger.debug('conversationId', conversationId);
      let query;
      const params = { conversationId, organization, identity };
      if (messageId) {
        const id = await api.getMessageId(conversationId, organization, identity, messageId);
        query = queryLib.getRowsWithNext();
        params.id = id;
      } else {
        query = queryLib.getRows();
      }
      const res = await db.executeQuery(query, params);
      return parseMessages(res);
    },
    getMessageId: async (conversationId, organization, identity, messageId) => {
      const query = queryLib.getRow();
      const params = {
        conversationId, organization, identity, messageId,
      };
      const result = await db.executeQuery(query, params);
      return safeAccess([0, 'id'], result);
    },
  };
  return api;
};

module.exports = History;
