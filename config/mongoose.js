const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker')

const db = mongoose.connection

db.on('err', () => {
  console.log('err!')
})

db.once('open', () =>{
  console.log('MongoDB connection.')
})

module.exports = db