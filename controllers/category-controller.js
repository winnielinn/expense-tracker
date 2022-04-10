const Category = require('../models/Category')


const categoryController = {
  getCategoryPage: async (req, res, next) => {
    try {
      const { id } = req.params

      const [categories, category] = await Promise.all([
        Category.find({}),
        id ? Category.findById(id) : null
      ])
      res.render('categories', { categories, category })
    } catch (err) {
      next(err)
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const { createdCategory, createdCategoryIcon } = req.body

      const category = await Category.findOne({ name: createdCategory })

      if (category) throw new Error('該分類已經存在！')

      await Category.create({
        name: createdCategory,
        icon: createdCategoryIcon
      })

      return res.status(301).redirect('/records/categories')
    } catch (err) {
      next(err)
    }
  },
  editCategory: async (req, res, next) => {
    try {
      const { id } = req.params
      const { categoryName, categoryIcon } = req.body

      if (!categoryName) throw new Error('分類名稱必須填寫！')

      const category = await Category.findById(id)

      await category.updateOne({
        name: categoryName,
        icon: categoryIcon
      })

      return res.status(301).redirect('/records/categories')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = categoryController