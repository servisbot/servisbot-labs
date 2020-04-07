const mssql = require('mssql');

module.exports = class MSSQLDatabase {
  constructor({ logger, connectionPool }) {
    this.logger = logger;
    this.connectionPool = connectionPool;
    this.dbTypes = {
      conversationId: mssql.VarChar(60),
      organization: mssql.VarChar(60),
      identity: mssql.VarChar(60),
      contents: mssql.NVarChar,
      messageId: mssql.VarChar(60),
      timestamp: mssql.BigInt,
      sbid: mssql.VarChar(100),
    };
  }

  async executeQuery(query, params) {
    this.logger.info('Executing Query');
    this.logger.debug('Query', query);
    this.logger.debug('Params', params);
    let request = this.connectionPool.request();
    // Add typed input parameters
    Object.keys(params).forEach((p) => {
      if (this.dbTypes[p]) {
        request = request.input(p, this.dbTypes[p], params[p]);
        return;
      }
      request = request.input(p, params[p]);
    });
    return request.query(query)
      .then((results) => {
        this.logger.debug('Results', JSON.stringify(results));
        return results.recordset;
      });
  }

  async health() {
    this.logger.info('Ping check');
    const request = this.connectionPool.request();
    await request.query('select 1;');
    return true;
  }
};
