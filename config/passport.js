const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')


// passport-local
passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
},
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))

      const match = await bcrypt.compare(password, user.password)
      if (!match) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

// passport-facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { email, name } = profile._json
      const user = await User.findOne({ email })

      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      const hash = bcrypt.hash(randomPassword, 10)

      await User.create({
        email,
        name,
        password: hash
      })

      return done(null, user)
    } catch (err) {
      done(err)
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