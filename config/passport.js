const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')


passport.use(new LocalStrategy({
  usernameField: 'email'
},
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) return done(null, false, { message: '找不到使用者。' })
      
      const match = await bcrypt.compare(password, user.password)
      if (!match) return done(null, false, { message: '帳號或密碼錯誤。' })

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

passport.serializeUser(async (user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

module.exports = passport