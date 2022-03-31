const Joi = require('joi')
function requireInbound (body) {
  const schema = Joi.object({
    from: Joi.string()
      .min(6)
      .max(16)
      .required()
      .messages({
        'string.min': `"from" is invalid`,
      'string.max': `"from" is invalid`,
      'any.required': `"from" is missing`
      }),
    to: Joi.string()
      .min(6)
      .max(16)
      .required()
      .messages({
        'string.min': `"to" is invalid`,
        'string.max': `"to" is invalid`,
        'any.required': `"to" is missing`      
      }),
    text: Joi.string()
      .min(1)
      .max(120)
      .required()
      .messages({
        'string.min': `"text" is invalid`,
      'string.max': `"text" is invalid`,
      'any.required': `"text" is missing`
      })
  })

  return schema.validate(body)
}

function validateInbound (body) {
    const schema = Joi.object({
      from: Joi.string()
        .min(6)
        .max(16)
        .messages({
          'string.pattern.base': `"from" is invalid`
        }),
      to: Joi.string()
        .min(6)
        .max(16)
        .required()
        .messages({
          'string.pattern.base': `"to" is invalid`
        }),
      text: Joi.string()
        .min(6)
        .max(16)
        .required()
        .messages({
          'string.pattern.base': `"text" is invalid`
        })
    })
  
    return schema.validate(body)
  }

module.exports = {
  validateInbound,
  requireInbound
}
