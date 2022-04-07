const express = require('express')
const passport = require('passport')
const router = express.Router()

const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/users', users)
router.use('/records', authenticator, records)

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/records',
  failureRedirect: '/users/login'
}))

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/records',
  failureRedirect: '/users/login',
}))

router.get('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)

module.exports = router