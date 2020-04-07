
const Transcript = ({ deps }) => {
  const {
    logger, queryLib, db, parseMessages
  } = deps;
  const api = {
    getTranscript: async (request) => {
      const { conversationId, organization } = request;
      logger.debug(`Handling get transcript for ${organization} and ${conversationId}`);
      const query = queryLib.getAllRowsForConversation();
      const params = { conversationId, organization };
      const res = await db.executeQuery(query, params);
      const messages = parseMessages(res);
      return { Messages: messages };
    }
  };
  return api;
};

module.exports = Transcript;
