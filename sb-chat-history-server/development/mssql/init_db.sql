CREATE DATABASE ServisbotChatHistory;
GO
USE ServisbotChatHistory;
CREATE TABLE Messages ( 
  Id BIGINT NOT NULL IDENTITY, 
  ConversationId VARCHAR(60) NOT NULL, 
  Organization VARCHAR(60) NOT NULL, 
  [Identity] VARCHAR(60) NOT NULL, 
  Contents nvarchar(max) NOT NULL, 
  MessageId VARCHAR(60) NOT NULL, 
  Timestamp BIGINT NOT NULL, 
  SbId VARCHAR(100) NOT NULL, 
  PRIMARY KEY (Id), 
  INDEX ConversationId (ConversationId), 
  INDEX Timestamp (Timestamp), 
  INDEX Organization (Organization), 
  UNIQUE(SbId) 
);
GO

CREATE TABLE Interactions ( 
  Id BIGINT NOT NULL IDENTITY, 
  ConversationId VARCHAR(60) NOT NULL, 
  Organization VARCHAR(60) NOT NULL, 
  [Identity] VARCHAR(60) NOT NULL, 
  Contents nvarchar(max) NOT NULL, 
  MessageId VARCHAR(60) NOT NULL, 
  Timestamp BIGINT NOT NULL, 
  SbId VARCHAR(100) NOT NULL, 
  PRIMARY KEY (Id), 
  INDEX ConversationId (ConversationId), 
  INDEX Timestamp (Timestamp), 
  INDEX Organization (Organization), 
  UNIQUE(SbId) 
);
GO