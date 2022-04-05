const Record = require('../models/Record')
const Category = require('../models/Category')

const recordController = {
  getRecords: async (req, res, next) => {
    try {
      const userId = req.user._id
      const categories = await Category.find().lean()
      const records = await Record.find({ userId }).populate('categoryId').sort({ _id: 'asc' }).lean()

      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      
      res.render('records', { categories, totalAmount, records })
    } catch (err) {
      next(err)
    }
  },
  getCreatePage: async (req, res, next) => {
    try {
      const categories = await Category.find().lean()

      res.render('create-records', { categories })
    } catch (err) {
      next(err)
    }
  },
  postRecord: async (req, res, next) => {
    try {
      res.render('create-records')
    } catch (err) {
      next(err)
    }
  },
  getEditPage: async (req, res, next) => {
    try {
      const { id } = req.params
      const [record, categories] = await Promise.all([
        Record.findById(id).lean(),
        Category.find().lean()
      ])

      res.render('edit-records', { record, categories })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = recordController