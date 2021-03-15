/* eslint-disable no-undef */
const DEFAULT_WIDTH = 800;
// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizeDataURL(imageB64, desiredWidth = DEFAULT_WIDTH) {
  const image = new Image();
  image.src = imageB64;
  const ratio = image.height / image.width;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = desiredWidth * ratio;
  canvas.width = desiredWidth;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
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
        // for each image file larger than 200kb, value.size is form.io detected file
        if (val.storage === 'base64' && val.size > 200000 && val.type.includes('image')) {
          val.url = resizeDataURL(val.url);
          // recalculate new size for form.io, Base64 encoded data is approximately 33% larger than original data
          const contentWithouthMime = val.url.split(',')[1];
          val.size = window.atob(contentWithouthMime).length;
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
