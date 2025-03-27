const Tour = require('../models/toursmodel.js')
const catchAsync = require('../utils/catchAsync.js')
const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getCheckOutSession =catchAsync( async(req,res,next)=>{
    //1) get the currently booked tour 
    const tour = await Tour.findById(req.params.tour)
    //2) create checkout session
    stripe.checkout.session.create({
        payment_method_type: ['card'],
        success_url : `${req.protocol}://${req.get('host')}/`,
        cancel_url:`${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email:req.user.email,
        client 
    })
    //3) create session as responce 
})