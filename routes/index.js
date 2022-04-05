const express = require('express')
const passport = require('passport')
const router = express.Router()

const records = require('./modules/records')
const userController = require('../controllers/user-controller')

router.use('/records', records)

router.get('/login', userController.getLoginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), userController.userLogin)
router.get('/register', userController.getRegisterPage)
router.post('/register', userController.userRegister)

router.get('/', (req, res) => res.redirect('/records'))

module.exports = router