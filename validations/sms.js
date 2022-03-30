const Joi = require("joi");
function validateInbound(body) {
  const schema = Joi.object({
    from: Joi.string().min(6).max(16).required(),
    to: Joi.string().min(6).max(16).required(),
    text: Joi.string().min(1).max(120).required(),
    
  });

  return schema.validate(body);
}

module.exports = {
    validateInbound,

};