const User = require('../models/User')
const bcrypt = require('bcryptjs')
const nodemailer = require('../config/nodemailer')

const userController = {
  getLoginPage: async (req, res, next) => {
    try {
      res.render('login')
    } catch (err) {
      next(err)
    }
  },
  userLogin: async (req, res, next) => {
    try {
      res.status(301).redirect('/records')
    } catch (err) {
      next(err)
    }
  },
  getRegisterPage: async (req, res, next) => {
    try {
      res.render('register')
    } catch (err) {
      next(err)
    }
  },
  userRegister: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const user = await User.findOne({ email })

      if (!name || !email || !password || !confirmPassword) throw new Error('所有欄位都是必填。')
      if (password !== confirmPassword) throw new Error('輸入的兩次密碼不相符。')
      if (user) throw new Error('該使用者已經註冊過。')

      const hash = await bcrypt.hashSync(password, 10)
      const registeredUser = await User.create({
        name,
        email,
        password: hash
      })

      req.login(registeredUser, () => {
        res.redirect('/records')
      })
    } catch (err) {
      next(err)
    }
  },
  userLogout: async (req, res, next) => {
    try {
      req.logout()
      req.flash('success_messages', '你已經成功登出。')
      return res.status(301).redirect('/users/login')
    } catch (err) {
      next(err)
    }
  },
  getForgetPasswordPage: async (req, res, next) => {
    try {
      res.render('forget-password')
    } catch (err) {
      next(err)
    }
  },
  forgetPassword: async (req, res, next) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      if (!user) throw new Error('該信箱尚未被註冊過！')

      const verifyCode = Math.random().toString(36).slice(-8)
      nodemailer(user, email, verifyCode)
      return res.render('reset-password', { verifyCode })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController