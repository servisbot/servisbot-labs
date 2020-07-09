const assert = require('assert');
const SimpleParser = require('mailparser').simpleParser;

/**
 * Receive email classes used for parsing and getting the details of the raw email
 */
module.exports = class ReceivedEmail {
  constructor({
    address, subject, body
  }) {
    assert(address, 'contactEmail is required');
    assert(subject, 'subject is required');
    assert(body, 'body is required');
    this.address = address;
    this.subject = subject;
    this.body = body;
  }

  /**
 * Returns the email address
 */
  getAddress() {
    return this.address;
  }

  /**
   * Returns the subject of the email
   */
  getSubject() {
    return this.subject;
  }

  /**
   * Returns the body of the email
   */
  getBody() {
    return this.body;
  }

  /**
   * Static method that parses the raw email returns a ReceivedEmail class
   * @param {} body
   */
  static async create(body) {
    const parsed = await SimpleParser(body);
    return new ReceivedEmail({
      address: parsed.from.value[0].address,
      subject: parsed.subject,
      body: parsed.text
    });
  }
};
