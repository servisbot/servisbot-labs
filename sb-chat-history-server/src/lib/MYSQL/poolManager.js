module.exports = class MySQLPoolManager {
  constructor(env, mysql) {
    const {
      DB_HOST,
      DB_CONNECTION_LIMIT,
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      DB_PORT,
    } = env;
    this.mysql = mysql;
    this.host = DB_HOST;
    this.user = DB_USER;
    this.password = DB_PASSWORD;
    this.databaseName = DB_NAME;
    this.databasePort = DB_PORT;
    this.connectionLimit = DB_CONNECTION_LIMIT;
  }

  async connect() {
    // connecting is lazy for "mysql", no promise here
    return this.mysql.createPool({
      connectionLimit: this.connectionLimit,
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.databaseName,
      port: this.databasePort,
      multipleStatements: true
    });
  }
};
