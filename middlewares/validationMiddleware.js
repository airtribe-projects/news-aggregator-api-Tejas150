const { registerSchema, loginSchema } = require('../validators/userValidator')

module.exports = {
  validateRegistration : (req, res, next) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    next()
  },

  validateLogin : (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    next()
  }
}
