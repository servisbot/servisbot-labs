module.exports = class MSSQLPoolManager {
  constructor(env, mssql) {
    const {
      DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_DOMAIN
    } = env;
    this.mssql = mssql;
    this.host = DB_HOST;
    this.user = DB_USER;
    this.domain = DB_DOMAIN === '' ? undefined : DB_DOMAIN;
    this.password = DB_PASSWORD;
    this.databaseName = DB_NAME;
    this.databasePort = parseInt(DB_PORT, 10);
  }

  async connect() {
    const pool = new this.mssql.ConnectionPool({
      server: this.host,
      user: this.user,
      password: this.password,
      database: this.databaseName,
      domain: this.domain,
      port: this.databasePort,
      options: {
        // the default value for `config.options.enableArithAbort` will change
        // from `false` to `true` in the next major version of `tedious`
        enableArithAbort: true,
      },
    });
    return pool.connect();
  }
};
