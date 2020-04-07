module.exports = class MSSQLPoolManager {
  constructor(env, mssql) {
    const {
      DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
    } = env;
    this.mssql = mssql;
    this.host = DB_HOST;
    this.user = DB_USER;
    this.password = DB_PASSWORD;
    this.databaseName = DB_NAME;
    this.mssql = mssql;
  }

  async connect() {
    const pool = new this.mssql.ConnectionPool({
      server: this.host,
      user: this.user,
      password: this.password,
      database: this.databaseName,
      options: {
        // the default value for `config.options.enableArithAbort` will change
        // from `false` to `true` in the next major version of `tedious`
        enableArithAbort: true
      }
    });
    return pool.connect();
  }
};
