const express =require('express')
const { getAlltours, addTour, getTour, updateTour, checkid, checkBody, deletetour, aliasTopTours, uploadTourImages, resizeTourImages } = require('../controllers/tourscontrollers');
const { protect, restrictTo } = require('../controllers/authController');
const { addreview } = require('../controllers/reviewController');
const router = express.Router()
const reviewRouter = require('./reviewroute')
// router.param('id',checkid)
router.use('/:tourId/reviews',reviewRouter)
// router.get('/top-5-cheap',protect, aliasTopTours,getAlltours)
router.get ('/',protect,getAlltours)
router.post('/' ,addTour)
router.get('/:id',protect,getTour)
router.patch('/:id',uploadTourImages,resizeTourImages,updateTour)
router.delete('/:id',protect,restrictTo('admin','lead-guid'),deletetour)

// router.post('/:tourId/reviews',protect,restrictTo('user'),addreview)

module.exports = router
