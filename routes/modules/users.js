const express = require('express')
const passport = require('passport')
const router = express.Router()

const userController = require('../../controllers/user-controller')

router.get('/login', userController.getLoginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }), userController.userLogin)
router.get('/register', userController.getRegisterPage)
router.post('/register', userController.userRegister)
router.get('/logout', userController.userLogout)

router.get('/forgetPassword', userController.getForgetPasswordPage)
router.get('/resetPassword', userController.getResetPasswordPage)
router.post('/resetPassword', userController.postResetPassword)
router.post('/forgetPassword', userController.forgetPassword)

module.exports = router