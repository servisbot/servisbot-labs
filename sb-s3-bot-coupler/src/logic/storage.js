const assert = require('assert');

module.exports = class Storage {
  constructor({ S3 }) {
    assert(S3, 'S3 is required');
    this.S3 = S3;
  }

  /**
   * Used to get the raw email from S3
   * @param {*} request
   */
  async getRawEmail(request) {
    const { bucket: { name }, object: { key } } = request;
    const params = {
      Bucket: name,
      Key: key
    };
    const result = await this.S3.getObject(params).promise();
    return result.Body.toString('utf8');
  }
};
