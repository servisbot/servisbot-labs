module.exports = class OraclePoolManager {
  constructor(env, oracledb) {
    const {
      DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_DOMAIN, DB_SID, DB_CONNECTION_LIMIT
    } = env;
    this.oracledb = oracledb;
    this.oracledb.autoCommit = true;
    oracledb.outFormat = this.oracledb.OUT_FORMAT_OBJECT;
    this.host = DB_HOST;
    this.user = DB_USER;
    this.domain = DB_DOMAIN === '' ? undefined : DB_DOMAIN;
    this.password = DB_PASSWORD;
    this.databaseName = DB_NAME.toLowerCase();
    this.databasePort = parseInt(DB_PORT, 10);
    this.sid = DB_SID;
    this.connectionLimit = DB_CONNECTION_LIMIT;
  }

  buildConnectionString() {
    return `${this.host}:${this.databasePort}/${this.sid}`;
  }

  async connect() {
    const connectionString = this.buildConnectionString();
    console.log(connectionString)
    return  this.oracledb.createPool({
      connectionString,
      user: this.user,
      password: this.password,
      poolMax: parseInt(this.connectionLimit, 10),
      poolMin: parseInt(this.connectionLimit, 10),
      poolIncrement: 0
    });
  }
};
