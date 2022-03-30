const express = require('express')
const router = express.Router()

const recordController = require('../../controllers/record-controller')

router.get('/', recordController.getRecords)
router.get('/create', recordController.getCreatePage)
router.get('/:id/edit', recordController.getEditPage)

module.exports = router