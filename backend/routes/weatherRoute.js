const express = require('express')
const {weatherController,cityController,cityUpdateController,deleteController} = require('../controller/weatherController')
const verifyJWT = require('../middlewares/authJwt')

const router = express.Router()

router.get('/',verifyJWT,weatherController)
router.get('/:id',verifyJWT,cityController)
router.put('/:id',cityUpdateController)
router.delete('/:id',deleteController)

module.exports = router