//  External dependencies
const Joi = require('@hapi/joi');

const validate = (data, schema) => {
  Joi.validate(data, schema, (_err) => {
    if (_err) throw _err;
  });
};

module.exports = validate;
