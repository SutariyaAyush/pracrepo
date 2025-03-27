const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        require:[true,"please write your review"],
        maxlength:[500,"maximum 50 char"],
        minlength:[10,"10 character minimum"]
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,"review must belong to a tour"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"review must belong to user"]
    }},
    {
        toJSON : {virtuals:true},
        toObject:{virtuals:true}
    }
)

reviewSchema.pre(/^find/,function(next){
    // // this.populate({
    //     path:'tour',
    //     select:'name'
    // }).populate({
    //     path:'user',
    //     select:'name'
    // })

    
    this.populate({
            path:'user',
            select:'name'
        })

    next()
})

reviewSchema.statics.calcAverageRatings = async function(tour){

    const stats=await this.aggregate([
        {
            $match:{tour:tourId}
        },
        {
            $group:{
                _id:'$tour',
                nRating:{$sum:1},
                avgRating:{$avg:'$rating'}
            }
        }
    ])
    console.log(stats);
    Tour.findByIdAndUpdate(tourId,{
        ratingsQuantity:stats[0].nRating,
        ratingsAverage:stats[0].avgRating
    })

}

reviewSchema.post('save',function(){
    //this points to current review

    this.constructor.calcAverageRatings(this.tour)
    
})

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review