const path = require('path');
const fs = require('fs');

const SB_FORM_TEMPLATES_DIR = '../../sb-form-templates';

const getTemplateFile = (name) => {
  const file = path.join(__dirname, SB_FORM_TEMPLATES_DIR, `/${name}.json`);
  if (fs.existsSync(file)) {
    return file;
  }
  return null;
};

// eslint-disable-next-line global-require, import/no-dynamic-require
const getTemplate = name => require(`${SB_FORM_TEMPLATES_DIR}/${name}.json`);

module.exports = {
  getTemplateFile,
  getTemplate
};
