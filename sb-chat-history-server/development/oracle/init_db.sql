CREATE USER servisbotchathistory IDENTIFIED BY sbpassword;


CREATE TABLE servisbotchathistory.Messages (
      Id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
      ConversationId VARCHAR2(60) NOT NULL,
      Organization VARCHAR2(60) NOT NULL,
      Identity VARCHAR2(60) NOT NULL,
      Contents LONG NOT NULL,
      MessageId VARCHAR2(60) NOT NULL,
      Timestamp TIMESTAMP NOT NULL,
      SbId VARCHAR2(100) NOT NULL UNIQUE,
      PRIMARY KEY (Id)
);
CREATE INDEX servisbotchathistory.idx_messages_convId ON servisbotchathistory.Messages (ConversationId); 
CREATE INDEX servisbotchathistory.idx_messages_ts ON servisbotchathistory.Messages (Timestamp); 
CREATE INDEX servisbotchathistory.idx_messages_org ON servisbotchathistory.Messages (Organization); 

CREATE TABLE servisbotchathistory.Interactions ( 
  Id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  ConversationId VARCHAR(60) NOT NULL, 
  Organization VARCHAR(60) NOT NULL, 
  Identity VARCHAR(60) NOT NULL, 
  Contents LONG NOT NULL, 
  MessageId VARCHAR(60) NOT NULL, 
  Timestamp TIMESTAMP NOT NULL, 
  SbId VARCHAR(100) NOT NULL UNIQUE, 
  PRIMARY KEY (Id)
  );

CREATE INDEX servisbotchathistory.idx_interactions_convId ON servisbotchathistory.Interactions (ConversationId); 
CREATE INDEX servisbotchathistory.idx_interactions_ts ON servisbotchathistory.Interactions (Timestamp); 
CREATE INDEX servisbotchathistory.idx_interactions_org ON servisbotchathistory.Interactions (Organization);

ALTER USER servisbotchathistory QUOTA unlimited ON USERS;
