const express = require('express')
const {weatherController,cityController,cityUpdateController,deleteController} = require('../controller/weatherController')

const router = express.Router()

router.get('/',weatherController)
router.get('/:id',cityController)
router.put('/:id',cityUpdateController)
router.delete('/:id',deleteController)

module.exports = router