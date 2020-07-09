const message = () => ({
  Messages: ['Yes I got that!'],
  CustomerReference: 'test@servisbot.com:::this is a subject',
  ContentType: 'TimelineMarkup'
});

const markup = () => ({
  Markdown: [{ message: 'Yes I got that!', type: 'message' }],
  CustomerReference: 'test@servisbot.com:::this is a subject',
  ContentType: 'TimelineMarkup'
});

const hostNotification = () => ({
  HostNotification: 'Have this host notification',
  CustomerReference: 'test@servisbot.com:::this is a subject',
  ContentType: 'TimelineMarkup'
});

module.exports = {
  Message: message(),
  Markup: markup(),
  HostNotification: hostNotification()
};
