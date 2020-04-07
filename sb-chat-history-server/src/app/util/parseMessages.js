module.exports = messages => messages.map((item) => {
  const messageContents = JSON.parse(item.messageContents);
  if (item.interactionContents) {
    const interactionContents = JSON.parse(item.interactionContents);
    messageContents.contents = {
      ...interactionContents.contents,
      ...messageContents.contents,
    };
  }
  return messageContents;
});
