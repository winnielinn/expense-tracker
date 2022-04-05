const User = require('../models/User')

const userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  },
  gerRegisterPage: (req, res) => {
    res.render('register')
  }
}

module.exports = userController