const Joi = require('@hapi/joi');

const schema = Joi.object().keys({ message: Joi.object().required() });

module.exports = schema;
