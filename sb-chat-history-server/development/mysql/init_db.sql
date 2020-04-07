CREATE TABLE IF NOT EXISTS Messages (
  Id BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
  ConversationId VARCHAR(60) NOT NULL,
  Organization VARCHAR(60) NOT NULL,
  Identity VARCHAR(60) NOT NULL,
  Contents TEXT NOT NULL,
  MessageId VARCHAR(60) NOT NULL,
  Timestamp BIGINT NOT NULL,
  SbId VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (Id),
  INDEX ConversationId (ConversationId),
  INDEX Timestamp (Timestamp),
  INDEX Organization (Organization)
);

CREATE TABLE IF NOT EXISTS Interactions (
  Id BIGINT UNIQUE NOT NULL AUTO_INCREMENT,
  ConversationId VARCHAR(60) NOT NULL,
  Organization VARCHAR(60) NOT NULL,
  Identity VARCHAR(60) NOT NULL,
  Contents TEXT NOT NULL,
  MessageId VARCHAR(60) NOT NULL,
  Timestamp BIGINT NOT NULL,
  SbId VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (Id),
  INDEX ConversationId (ConversationId),
  INDEX Timestamp (Timestamp),
  INDEX Organization (Organization)
);