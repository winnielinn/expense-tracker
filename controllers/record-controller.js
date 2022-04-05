const Record = require('../models/Record')
const Category = require('../models/Category')

const recordController = {
  getRecords: async (req, res, next) => {
    try {
      const userId = req.user._id
      const categories = await Category.find().lean()
      const records = await Record.find({ userId }).populate('categoryId').sort({ date: 'desc' }).lean()

      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }

      return res.render('records', { categories, totalAmount, records })
    } catch (err) {
      next(err)
    }
  },
  getCreatePage: async (req, res, next) => {
    try {
      const categories = await Category.find().lean()

      return res.render('create-records', { categories })
    } catch (err) {
      next(err)
    }
  },
  postRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const { name, date, categoryId, amount } = req.body

      if (!name || !date || categoryId === '請選擇類別' || !amount) throw new Error('所有欄位都必須填寫！')

      Record.create({
        name,
        date,
        categoryId,
        amount,
        userId
      })

      return res.status(301).redirect('/records')
    } catch (err) {
      next(err)
    }
  },
  getEditPage: async (req, res, next) => {
    try {
      const userId = req.user._id
      const { id } = req.params

      const [record, categories] = await Promise.all([
        Record.findById(id).lean(),
        Category.find().lean()
      ])

      if (record.userId.toString() !== userId.toString()) throw new Error('無法修改不屬於你的資料！')

      return res.render('edit-records', { record, categories })
    } catch (err) {
      next(err)
    }
  },
  editRecord: async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, date, categoryId, amount } = req.body

      if (!name || !date || categoryId === '請選擇類別' || !amount) throw new Error('所有欄位都必須填寫！')

      const record = await Record.findById(id)

      await record.updateOne({
        name,
        date,
        categoryId,
        amount
      })

      return res.status(301).redirect('/records')
    } catch (err) {
      next(err)
    }
  },
  deleteRecord: async (req, res, next) => {
    try {
      const { id } = req.params

      await Record.deleteOne({ _id: id })

      return res.status(301).redirect('/records')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = recordController