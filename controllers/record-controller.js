const Record = require('../models/Record')
const Category = require('../models/Category')

const recordController = {
  getRecords: async (req, res) => {
    try {
      res.render('records')
    } catch (err) {
      console.log(err)
    }
  },
  getCreatePage: async (req, res) => {
    try {
      res.render('create-records')
    } catch (err) {
      console.log(err)
    }
  },
  getEditPage: async (req, res) => {
    try {
      res.render('edit-records')
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = recordController