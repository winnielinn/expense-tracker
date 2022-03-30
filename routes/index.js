const express = require('express')
const router = express.Router()

const records = require('./modules/records')

router.use('/records', records)


router.get('/', (req, res) => res.redirect('/records'))

module.exports = router