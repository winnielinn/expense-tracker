const express = require('express')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')

const handlebarsHelpers = require('./helpers/handlebars-helpers')
const routes = require('./routes')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers })

const app = express()
const port = 3000
require('./config/mongoose')

// express-handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')

// method-override
app.use(methodOverride('_method'))

// body-parser
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(session({
  secret: 'mySecretSession',
  resave: true,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)


app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})