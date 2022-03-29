const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const User = require('../../models/User')
const Record = require('../../models/Record')
const Category = require('../Category')

const userList = require('./user.json').results
const recordList = require('./record.json').results

db.once('open', async () => {
  // create user
  userList.forEach(user => {
    user.password = bcrypt.hashSync(user.password, 10)
  })
  
  await User.insertMany(userList)

  // create record
  const categories = await Category.find().lean()

  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < recordList.length; j++) {
      if (recordList[j].categoryName === categories[i].name) {
        recordList[j].categoryId = categories[i]._id
      } 
    }
  }

  const users = await User.find().lean()
  
  recordList.forEach((record, r_index) => {
    if (r_index < 3) return record.userId = users[0]._id

    return record.userId = users[1]._id
  })

  await Record.insertMany(recordList)

  console.log('recordSeeder created.')
  process.exit()
})