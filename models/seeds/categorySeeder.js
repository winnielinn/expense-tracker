const db = require('../../config/mongoose')
const Category = require('../Category')
const categoryList = require('./category.json').results

db.once('open', async () => {
  await Category.insertMany(categoryList)
  
  console.log('categorySeeder created.')
  process.exit()
})