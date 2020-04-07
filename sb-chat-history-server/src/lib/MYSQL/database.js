
module.exports = class MySQLDatabase {
  constructor({ logger, connectionPool }) {
    this.logger = logger;
    this.connectionPool = connectionPool;
  }

  async executeQuery(query, params) {
    this.logger.info('Executing Query');
    this.logger.debug('Query', query);
    this.logger.debug('Params', params);
    return new Promise((resolve, reject) => this.connectionPool.query(query, Object.values(params),
      (_err, results, fields) => {
        if (_err) {
          return reject(_err);
        }
        this.logger.debug('Results', JSON.stringify(results));
        this.logger.debug('Fields', JSON.stringify(fields));
        return resolve(results);
      }));
  }

  async health() {
    this.logger.info('Ping check');
    return new Promise((resolve, reject) => this.connectionPool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      return connection.ping((_err) => {
        connection.release();
        if (_err) {
          return reject(_err);
        }
        return resolve(true);
      });
    }));
  }
};
