const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)

const db = mongoose.connection

db.on('err', () => {
  console.log('err!')
})

db.once('open', () =>{
  console.log('MongoDB connection.')
})

module.exports = db