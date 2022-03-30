const express = require('express')
const router = express.Router()
const controller = require('../controllers')

//create
router.post('/sms', controller.sms.inbound)

module.exports = router
