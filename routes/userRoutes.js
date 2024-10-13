const express = require('express')
const { register, login, getUserPreferences, updateUserPreferences } = require('../controllers/userController')
const { validateRegistration, validateLogin } = require('../middlewares/validationMiddleware')

const router = express.Router()

// Public routes
router.post('/signup', validateRegistration, register)
router.post('/login', validateLogin, login)

// Protected routes
const authMiddleware = require('../middlewares/authMiddleware')
router.use(authMiddleware)

router.get('/preferences', getUserPreferences)
router.put('/preferences', updateUserPreferences)

module.exports = router
