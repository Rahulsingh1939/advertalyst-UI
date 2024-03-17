const express = require('express')
const {weatherController,cityController} = require('../controller/weatherController')

const router = express.Router()

router.get('/',weatherController)
router.get('/:id',cityController)

module.exports = router