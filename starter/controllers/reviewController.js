const Review = require('../models/reviewmodel')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handleFactory')
exports.getallreview = catchAsync(async(req,res,next)=>{
    let filter={}
    if(req.params.tourId) filter = {tour:req.params.tourId}
    const reviews = await Review.find(filter)

    res.status(200).json({
        status:"success",
        reviews
    })
})

exports.setToursUserIds = (req,res,next)=>{
    //all nested route
    if(!req.body.tour) req.body.tour = req.params.tourId
    if(!req.body.user) req.body.user = req.user.id
    next()
}
exports.addreview = factory.createOne(Review)
exports.getreview = factory.createOne(Review,{path:'User'})
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)