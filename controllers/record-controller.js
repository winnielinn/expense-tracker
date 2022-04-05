const Record = require('../models/Record')
const Category = require('../models/Category')

const recordController = {
  getRecords: async (req, res, next) => {
    try {
      const records = await Record.aggregate([
        {
          $lookup:
          {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category_doc'
          }
        }
      ])
      const totalAmount = await Record.aggregate([
          {
            $group:
            {
              _id: "Total",
              sum: { $sum: "$amount" }
            }
          }
      ])
      const categories = await Category.find().lean()
      res.render('records', { categories, totalAmount: totalAmount[0].sum, records })
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