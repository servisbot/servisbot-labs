//  Database queries

const { DB_NAME } = process.env;
const queries = {
  insertMessagesRow: () => `INSERT INTO [${DB_NAME}].[dbo].[Messages] 
    (ConversationId, Organization, [Identity], MessageId, Contents, Timestamp, SbId) 
    VALUES (@conversationId, @organization, @identity, @messageId, @contents, @timestamp, @sbid);`,

  insertInteractionsRow: () => `INSERT INTO [${DB_NAME}].[dbo].[Interactions] 
    (ConversationId, Organization, [Identity], MessageId, Contents, Timestamp, SbId) 
    VALUES (@conversationId, @organization, @identity, @messageId, @contents, @timestamp, @sbid);`,

  getRow: () => `SELECT id FROM [${DB_NAME}].[dbo].[Messages] 
    WHERE ConversationId = @conversationId 
    AND Organization = @organization 
    AND [Identity] = @identity;`,

  getRows: () => `SELECT m.id AS id, 
    m.Contents AS messageContents, 
    i.Contents AS interactionContents 
    FROM [${DB_NAME}].[dbo].[Messages] AS m 
    LEFT JOIN [${DB_NAME}].[dbo].[Interactions] AS i 
    ON m.MessageId = i.MessageId 
    WHERE m.ConversationId = @conversationId 
    AND m.Organization = @organization 
    AND m.[Identity] = @identity 
    ORDER BY m.id DESC OFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY;`,

  getRowsWithNext: () => `SELECT Contents FROM [${DB_NAME}].[dbo].[Messages] 
    WHERE ConversationId = @conversationId 
    AND Organization = @organization 
    AND [Identity] = @identity  
    AND id < ?  
    ORDER BY id DESC OFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY;`,
};

module.exports = queries;
