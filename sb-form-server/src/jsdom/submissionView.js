/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["img"] }] */

const fs = require('fs');
const jsdom = require('jsdom');
const { Script } = require('vm');

const templates = require('../util/templates');

const { JSDOM } = jsdom;

const baseUrl = 'http://local';

const render = async (templateName, submission) => new Promise((resolve, reject) => {
  // ! time needs to be addressed
  const rejectTimeout = setTimeout(() => (reject(new Error('Failed to render submission in jsdom'))), 20000);

  const renderForm = `
    window.onload = function() {
        Formio.createForm(document.getElementById('formio'), Form, {
          readOnly: true,
          renderMode: 'html',
        })
        .then(form => {
          form.setSubmission({ data: Submission})
          form.on('change', x => {
           form.redraw()
          })
          form.on('render', x => {
              setTimeout(() =>{
                OnComplete()
              })
          })
        })
    };`;

  // Load scripts through the VM so they don't appear in the final output
  const vendor = new Script(fs.readFileSync('./public/javascripts/formio.full.min.js').toString());
  const script = new Script(renderForm);
  const indexHtml = fs.readFileSync('./src/jsdom/index.html');
  const dom = new JSDOM(indexHtml, {
    runScripts: 'dangerously',
    url: baseUrl,
    pretendToBeVisual: true
  });
  const vmContext = dom.getInternalVMContext();
  const form = templates.getTemplate(templateName);

  vmContext.Form = form;
  vmContext.Submission = submission;

  vmContext.OnComplete = () => {
    const { window } = dom;
    const attachments = Array.from(window.document.images).map((img, index) => {
      if (img.src.startsWith('data:image/')) {
        const extension = img.src.split(';')[0].split('/')[1];
        const name = img.alt ? img.alt : `attachment-${index}.${extension}`;
        const cid = `cid:${name}`;
        const attachment = {
          filename: name,
          path: img.src,
          cid: name
        };
        img.src = cid;
        img.id = name;
        return attachment;
      }
      return {
        filename: img.src,
        path: img.src,
        cid: img.src
      };
    });
    const html = window.document.documentElement.innerHTML;

    clearTimeout(rejectTimeout);
    resolve({ attachments: attachments || [], html });
  };

  vendor.runInContext(vmContext);
  script.runInContext(vmContext);
});

module.exports = {
  render
};
