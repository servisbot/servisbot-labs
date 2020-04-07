//  Database queries
const queries = {
  insertMessagesRow: () => 'INSERT INTO Messages '
    + '(`ConversationId`, `Organization`, `Identity`, `MessageId`, `Contents`, `Timestamp`, `SbId`) '
    + 'VALUES (?, ?, ?, ?, ?, ?, ?);',

  insertInteractionsRow: () => 'INSERT INTO Interactions '
    + '(`ConversationId`, `Organization`, `Identity`, `MessageId`, `Contents`, `Timestamp`, `SbId`) '
    + 'VALUES (?, ?, ?, ?, ?, ?, ?);',

  getRow: () => 'SELECT id FROM Messages '
    + 'WHERE `ConversationId` = ? '
    + 'AND `Organization` = ? '
    + 'AND `Identity` = ? '
    + 'AND `MessageId` = ? ',

  getRows: () => 'SELECT m.id as id, '
    + 'm.Contents as messageContents, '
    + 'i.Contents as interactionContents '
    + 'FROM Messages as m '
    + 'LEFT JOIN Interactions as i '
    + 'ON m.MessageId = i.MessageId '
    + 'WHERE m.ConversationId = ? '
    + 'AND m.Organization = ? '
    + 'AND m.Identity = ? '
    + 'ORDER BY m.id DESC limit 50;',

  getAllRowsForConversation: () => 'SELECT m.id as id, '
  + 'm.Contents as messageContents, '
  + 'i.Contents as interactionContents '
  + 'FROM Messages as m '
  + 'LEFT JOIN Interactions as i '
  + 'ON m.MessageId = i.MessageId '
  + 'WHERE m.ConversationId = ? '
  + 'AND m.Organization = ? '
  + 'ORDER BY m.Timestamp',

  getRowsWithNext: () => 'SELECT m.id as id, '
    + 'm.Contents as messageContents, '
    + 'i.Contents as interactionContents '
    + 'FROM Messages as m '
    + 'LEFT JOIN Interactions as i '
    + 'ON m.MessageId = i.MessageId '
    + 'WHERE m.ConversationId = ? '
    + 'AND m.Organization = ? '
    + 'AND m.Identity = ?  '
    + 'AND m.id < ?  '
    + 'ORDER BY m.id DESC limit 50;'
};

module.exports = queries;
