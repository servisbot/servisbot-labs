//  Database queries

const queries = {
  insertMessagesRow: () => `INSERT INTO ServisbotChatHistory.Messages (ConversationId, Organization, Identity, MessageId, Contents, Timestamp, SbId)
    VALUES (:ConversationId, :Organization, :Identity, :MessageId, :Contents, :Timestamp, :SbId)
    `,

  insertInteractionsRow: () => `INSERT INTO ServisbotChatHistory.Interactions
    (ConversationId, Organization, Identity, MessageId, Contents, Timestamp, SbId)
    VALUES (:ConversationId, :Organization, :Identity, :MessageId, :Contents, :Timestamp, :SbId)`,

  getRow: () => `SELECT id FROM ServisbotChatHistory.Messages 
     WHERE ConversationId = :ConversationId 
     AND   Organization = :Organization 
     AND   Identity = :Identity 
     AND   MessageId = :MessageId `,

  getRows: () => `SELECT m.id as id, 
    m.Contents as messageContents, 
    i.Contents as interactionContents 
    FROM ServisbotChatHistory.Messages m 
    LEFT JOIN ServisbotChatHistory.Interactions i 
    ON m.MessageId = i.MessageId 
    WHERE m.ConversationId = :ConversationId 
    AND m.Organization = :Organization
    AND m.Identity = :Identity
    ORDER BY m.id DESC OFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY`,

  getAllRowsForConversation: () =>`SELECT m.id as id, 
  m.Contents as messageContents, 
  i.Contents as interactionContents 
  FROM ServisbotChatHistory.Messages m 
  LEFT JOIN ServisbotChatHistory.Interactions i 
  ON m.MessageId = i.MessageId 
  WHERE m.ConversationId = :ConversationId
  AND m.Organization = :Organization 
  ORDER BY m.Timestamp`,

  getRowsWithNext: () =>`SELECT m.id as id, 
    m.Contents as messageContents, 
    i.Contents as interactionContents 
    FROM ServisbotChatHistory.Messages m 
    LEFT JOIN ServisbotChatHistory.Interactions i 
    ON m.MessageId = i.MessageId 
    WHERE m.ConversationId = :ConversationId 
    AND m.Organization = :Organization 
    AND m.Identity = :Identity  
    AND m.id < :id  
    ORDER BY m.id DESC OFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY`,
};

module.exports = queries;