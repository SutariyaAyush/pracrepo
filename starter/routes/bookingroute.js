const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const { getCheckOutSession } = require('../controllers/bookingController')
const router = express.Router()

router.get('/checkout-session/:tourID',protect,getCheckOutSession)
module.exports = router 
