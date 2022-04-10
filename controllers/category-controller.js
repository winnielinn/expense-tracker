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
  }
}

module.exports = categoryController