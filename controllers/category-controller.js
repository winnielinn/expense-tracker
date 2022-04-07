const Category = require('../models/Category')


const categoryController = {
  getCategoryPage: async(req, res, next) => {
    try {
      const categories = await Category.find({})
      res.render('categories', { categories })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = categoryController