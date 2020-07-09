const assert = require('assert');

/**
 * Handles the connection to servisbot web hook adaptor
 */
module.exports = class ServisbotWebhookController {
  constructor({ fetch, servisbotWebhookApiKey, servisbotWebhookUrl }) {
    assert(fetch, 'fetch is required');
    assert(servisbotWebhookApiKey, 'servisbotWebhookApiKey are required');
    this.fetch = fetch;
    this.servisbotWebhookApiKey = servisbotWebhookApiKey;
    this.servisbotWebhookUrl = servisbotWebhookUrl;
  }

  /**
   * Used to send a message to SB
   * @param {} request
   */
  async sendEmailToBotPlatform(request) {
    const message = JSON.stringify({
      emailBody: request.getBody(),
      emailSubject: request.getSubject(),
      emailAddress: request.getAddress(),
    });

    const fetchResult = await this.fetch(this.servisbotWebhookUrl, {
      method: 'POST',
      headers: {
        Authorization: this.servisbotWebhookApiKey,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Type: 'message',
        Value: message,
        Context: { emailSubject: request.getSubject(), emailAddress: request.getAddress() },
        CustomerReference: `${request.getAddress()}:::${request.getSubject()}`,
      }),
    });
    if (!fetchResult.ok) {
      const text = await fetchResult.text();
      throw new Error(`Got status code ${fetchResult.status} and message: ${text}`);
    }
  }
};
