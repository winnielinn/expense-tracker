const express = require('express')
const passport = require('passport')
const router = express.Router()

const records = require('./modules/records')
const userController = require('../controllers/user-controller')
const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/records', authenticator, records)

router.get('/users/login', userController.getLoginPage)
router.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }), userController.userLogin)
router.get('/users/register', userController.getRegisterPage)
router.post('/users/register', userController.userRegister)
router.get('/users/logout', userController.userLogout)

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)

module.exports = router