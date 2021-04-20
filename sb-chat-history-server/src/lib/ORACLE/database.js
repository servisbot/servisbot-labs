
module.exports = class OracleDatabase {
  constructor({ logger, connectionPool }) {
    this.logger = logger;
    this.connectionPool = connectionPool;
    this.rowsKeys = {
      messageContents: 'MESSAGECONTENTS',
      interactionContents: 'INTERACTIONCONTENTS'
    }
  }
  buildBindings(params) {
    const bindings = Object.keys(params).reduce((acc, key) => {
      if (key.toLocaleLowerCase() === 'timestamp') {
        acc[key] = { val: new Date(params[key]) }
        return acc
      }
      acc[key] = { val: params[key] }
      return acc
    }, {});

    return bindings
  }

  async executeQuery(query, params) {
    this.logger.info('Executing Query');
    this.logger.debug('Query', query);
    let connection = await this.connectionPool.getConnection();
    const bindings = this.buildBindings(params)
    this.logger.debug('Bindings', bindings);
    const res = await connection.execute(query, bindings);
    await connection.close()
    if (res.rows) {
      return res.rows.map(row => ({
        id: row.ID,
        messageContents: row.MESSAGECONTENTS,
        interactionContents: row.INTERACTIONCONTENTS
      }))
    }
    return res
  }

  async health() {
    this.logger.info('Ping check');
    const connection = await this.connectionPool.getConnection();
    await connection.ping()
    await connection.close()
    return true
  }
};










