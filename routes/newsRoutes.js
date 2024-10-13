const express = require('express')
const { getNews } = require('../controllers/newsController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', getNews)

module.exports = router
