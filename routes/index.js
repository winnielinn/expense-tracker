const express = require('express')
const passport = require('passport')
const router = express.Router()

const records = require('./modules/records')
const userController = require('../controllers/user-controller')

router.use('/records', records)

router.get('/users/login', userController.getLoginPage)
router.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login' }), userController.userLogin)
router.get('/users/register', userController.getRegisterPage)
router.post('/users/register', userController.userRegister)
router.get('/users/logout', userController.userLogout)

router.get('/', (req, res) => res.redirect('/records'))

module.exports = router