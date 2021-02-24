/* eslint-disable no-undef */

// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizedataURL(imageB64, wantedHeight) {
  const image = new Image();
  image.src = imageB64;
  const ratio = image.width / image.height;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const wantedWidth = wantedHeight * ratio;
  canvas.width = wantedWidth;
  canvas.height = wantedHeight;
  context.drawImage(image, 0, 0, wantedWidth, wantedHeight);
  const dataURI = canvas.toDataURL();
  return dataURI;
}

window.onload = () => {
  Formio.createForm(document.getElementById('formio'), `${window.location.origin}/templates/${formName}`, {}).then((form) => {
    form.on('change', (event) => {
      const { changed } = event;
      if (!changed) return;
      const { value } = changed;
      if (!Array.isArray(value)) return;
      for (let index = 0; index < value.length; index += 1) {
        const val = value[index];
        if (val.storage === 'base64' && val.size > 200000 && val.type.includes('image')) {
          val.url = val.size > 1500 ? resizedataURL(val.url, 1000) : val.url;
          val.size = Math.round(val.url.length * (3 / 4));
        }
      }
    });
    form.on('Cancel', () => {
      window.parent.parent.postMessage('closeServisBotTask', '*');
    });

    form.on('submitDone', () => {
      window.location.pathname = '/thanks';
    });
  });
};
