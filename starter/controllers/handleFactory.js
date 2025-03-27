const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.deleteOne= Model => catchAsync( async (req,res,next) =>{
    const doc= await Model.findByIdAndDelete(req.params.id)
    if(!doc){
       return next(new AppError('No doc found',404))
    }
    return res.status(204).json({
       status:"success",
       data:null 
    })

})

exports.updateOne= Model => catchAsync( async(req,res,next)=>{
    const id = req.params.id 
    const doc = await Model.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators :true
    })
    if(!doc){
        return next(new AppError('No doc found',404))
     }
    //doc.findOne({_id : req.params.id})
    return res.status(200).json({
        status :"success",
        data: doc
    })
})

exports.createOne=Model=>catchAsync( async(req,res,next)=>{
    
    const newDoc = await Model.create(req.body)
    return res.status(201).json({
        status:"success",
        data :{
            docs : newDoc
        }
    })


})

exports.getOne = (Model,popOptions) => catchAsync( async (req,res,next)=>{
    let query = Model.findById(req.params.id)
    if(popOptions) query = query.populate(popOptions)
    const doc = await query
    //doc.findOne({_id : req.params.id})
    if(!doc){    
       return next(new AppError('No doc found',404))
    }
    res.status(200).json({
        status :"success",
        data: doc
    })
    
})