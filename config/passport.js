const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
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
  (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json

    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)

        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err))
      })
  }
))

// passport-google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, done) => {
  const { name, email } = profile._json

  User.findOne({ email })
    .then(user => {
      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => done(null, user))
        .catch(err => done(err))
    })
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