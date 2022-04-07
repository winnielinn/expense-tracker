const Category = require('../models/Category')


const categoryController = {
  getCategoryPage: async(req, res, next) => {
    try {
      res.render('categories')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = categoryController