const express = require('express')
const { getallreview, addreview, deleteReview, setToursUserIds, getreview } = require('../controllers/reviewController')
const { protect, restrictTo } = require('../controllers/authController')
const router = express.Router({mergeParams:true})

router.get('/',protect,getallreview)
router.get('/:id',protect,getreview)
router.post('/',protect,restrictTo('user'),setToursUserIds, addreview)
router.delete('/:id',protect,deleteReview)
module.exports = router 
