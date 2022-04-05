const User = require('../models/User')
const bcrypt = require('bcryptjs')

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

      const hash = await bcrypt.hash(password, 10)
      await User.create({
        name,
        email,
        password: hash
      })

      return res.status(301).redirect('/records')
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
  }
}

module.exports = userController