
module.exports = async (dependencies, request) => {
  const { ReceivedEmail, servisbotWebhookController, storage } = dependencies;
  const emailData = await storage.getRawEmail(request);
  const emailRequest = await ReceivedEmail.create(emailData);
  await servisbotWebhookController.sendEmailToBotPlatform(emailRequest);
};
