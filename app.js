const express = require('express')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' })
const methodOverride = require('method-override')

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

app.get('/', (req, res) => {
  res.render('records')
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})