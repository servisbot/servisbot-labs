/* eslint-disable no-undef */

window.onload = () => {
  Formio.createForm(document.getElementById('formio'), `${window.location.origin}/templates/${formName}`, {}).then((form) => {
    form.on('Cancel', () => {
      window.parent.parent.postMessage('closeServisBotTask', '*');
    });

    form.on('submitDone', () => {
      window.location.pathname = '/thanks';
    });
  });
};
