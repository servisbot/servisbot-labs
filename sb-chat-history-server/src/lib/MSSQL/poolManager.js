module.exports = class MSSQLPoolManager {
  constructor(env, mssql) {
    const {
      DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
    } = env;
    console.log(env)
    this.mssql = mssql;
    this.host = DB_HOST;
    this.user = DB_USER;
    this.password = DB_PASSWORD;
    this.databaseName = DB_NAME;
    this.databasePort = DB_PORT;
    this.mssql = mssql;
  }

  async connect() {
    let port = this.databasePort
    // process.env will set this to a string in some cases this is to handle
    try {
      port = parseInt(this.databasePort, 10)
    } catch(e) {

    }

    const pool = new this.mssql.ConnectionPool({
      server: this.host,
      user: this.user,
      password: this.password,
      database: this.databaseName,
      port: port,
      options: {
        // the default value for `config.options.enableArithAbort` will change
        // from `false` to `true` in the next major version of `tedious`
        enableArithAbort: true
      }
    });
    return pool.connect();
  }
};
