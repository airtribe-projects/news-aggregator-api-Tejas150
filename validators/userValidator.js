const Joi = require('joi');

module.exports = {
  registerSchema : Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    preferences: Joi.array().items(Joi.string()).optional(),
  }),

  loginSchema : Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
}
