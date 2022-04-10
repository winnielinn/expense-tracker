const express = require('express')
const router = express.Router()

const recordController = require('../../controllers/record-controller')
const categoryController = require('../../controllers/category-controller')

router.get('/', recordController.getRecords)
router.post('/', recordController.postRecord)
router.get('/create', recordController.getCreatePage)
router.get('/:id/edit', recordController.getEditPage)
router.put('/:id', recordController.editRecord)
router.delete('/:id', recordController.deleteRecord)

router.get('/categories/:id', categoryController.getCategoryPage)
router.get('/categories', categoryController.getCategoryPage)
router.post('/categories', categoryController.createCategory)

module.exports = router