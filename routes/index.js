const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const userController = require('../controllers/user-controller')

router.use('/records', records)

router.get('/login', userController.getLoginPage)
router.get('/register', userController.gerRegisterPage)

router.get('/', (req, res) => res.redirect('/records'))

module.exports = router