const express = require('express')
const {JWTController} = require('../controller/authController')

const router = express.Router()

router.post('/getJWT',JWTController)

module.exports = router