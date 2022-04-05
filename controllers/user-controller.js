const User = require('../models/User')
const bcrypt = require('bcryptjs')

const userController = {
  getLoginPage: async (req, res) => {
    try {
      res.render('login')
    } catch (err) {
      console.log(err)
    }
  },
  userLogin: async (req, res) => {
    try {
      res.status(301).redirect('/records')
    } catch (err) {
      console.log(err)
    }
  },
  getRegisterPage: async (req, res) => {
    try {
      res.render('register')
    } catch (err) {
      console.log(err)
    }
  },
  userRegister: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const hash = await bcrypt.hash(password, 10)
      const user = await User.findOne({ email })

      if (user) {
        console.log('該用戶已經註冊過。')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }

      if (password !== confirmPassword) return console.log('輸入的兩次密碼不相符。')

      await User.create({
        name,
        email,
        password: hash
      })

      return res.status(301).redirect('/records')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userController