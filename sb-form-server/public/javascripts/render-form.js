/*
  Updated: 28/05/2020
*/

/* eslint-disable no-undef */
function getBase64ImageSize(b64Image) {
  const contentWithoutMime = b64Image.split(',')[1];
  return window.atob(contentWithoutMime).length;
}

// Base64 encoding should leave about 33% buffer
const MAX_EMAIL_SIZE = 0.67 * 1000000;
const DEFAULT_WIDTH = 1024;
// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizeDataURL(imageB64, maxImgSize) {
  const image = new Image();
  image.src = imageB64;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const ratio = image.height / image.width;
  canvas.height = DEFAULT_WIDTH * ratio;
  canvas.width = DEFAULT_WIDTH;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  let quality = 1;
  let dataURI = canvas.toDataURL('image/jpeg', quality);
  for (let i = 0; i < 9; i += 1) {
    dataURI = canvas.toDataURL('image/jpeg', quality);
    const currentSize = getBase64ImageSize(dataURI);
    if (currentSize < maxImgSize) {
      return dataURI;
    }
    if (currentSize > maxImgSize) {
      quality -= 0.1;
    }
  }
  return dataURI;
}


window.onload = () => {
  Formio.createForm(document.getElementById('formio'), `${window.location.origin}/templates/${formName}`, {}).then((form) => {
    const maxFiles = document.getElementsByClassName('fileSelector').length;
    const maxImgSize = MAX_EMAIL_SIZE / maxFiles;
    form.on('change', (event) => {
      const { changed } = event;
      if (!changed) return;
      const { value } = changed;
      if (!Array.isArray(value)) return;
      for (let index = 0; index < value.length; index += 1) {
        const val = value[index];
        if (val.storage === 'base64' && val.type.includes('image')) {
          val.url = resizeDataURL(val.url, maxImgSize);
          val.size = getBase64ImageSize(val.url);
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
