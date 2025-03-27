
const Tour = require('../models/toursmodel.js')
const AppError = require('../utils/appError.js')
const catchAsync = require('../utils/catchAsync.js')
const factory = require('./handleFactory.js');
const multer = require('multer')
const sharp= require('sharp')

// exports.checkid = (req,res,next,val) => {
//     // or req.params.id * 1
//     if(req.params.id * 1>tours.length) return res.status(404).json({
//         status : "fail",
//         message : "invalid Id"
//     })
//     next()
// }
const multerStorage = multer.memoryStorage(); 

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
  
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([
    {name : 'imageCover',maxCount:1},
    {name:'images',maxCount:3}
])
// upload.single('image')
// upload.array('images',5)

exports.resizeTourImages =catchAsync( async (req,res,next) =>{

    if(!req.files.imageCover || !req.files.images) return next()

    //1) imagecover
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
    console.log("imagecover",req.body.imageCover);
    await sharp(req.files.imageCover[0].buffer).resize(2000,1333).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/tours/${req.body.imageCover}`)

    //2)images
    req.body.images=[]
    await Promise.all(req.files.images.map(async(file,i)=>{
        const filename = `tour-${req.params.id}-${Date.now()}-${i+1}.jpeg`
        await sharp(file.buffer).resize(2000,1333).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/tours/${filename}`)

        req.body.images.push(filename)
    }))

    next()
})

exports.aliasTopTours = (req,res,next) =>{
    req.query.limit='5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summery,difficulty'
    next()
}


exports.getAlltours =catchAsync( async (req,res,next)=>{

        //filtering
        //Build query
        const queryobj = {...req.query} //we also include page and sort param into api 
        const excludeFields = ['page','sort','limit','fields']
        excludeFields.forEach(el => delete queryobj[el])
        let query = Tour.find(queryobj)
        console.log(req.query);
        //{difficulty : 'easy' , duration : {$gte : 5} }

        // let querstr = JSON.stringify(queryobj)
        // querstr = querstr.replace(/\bb(gte|gt|lte|lt)\b/g , match=> `$${match}`)
        // const query = Tour.find(querstr) we can use $ symbol directly in url

//         { duration: { '$gte': '5' }, page: '2', sort: 'price' }
// GET /api/v1/tours?duration[$gte]=5&page=2&sort=price 200 66.780 ms - 7565
// { duration: { '$gte': '5' }, page: '2', sort: '-price' }

        //sorting - for decending put - infront of value of param
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query=query.sort('-createdAt');
        }

        //field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query= query.select(fields)
        }else{
            query = query.select('-__v') //- means excluding
        }

        //pagination
        const page = req.query.page * 1 ||1
        const limit = req.query.limit * 1 || 100
        const skip = (page - 1) * limit 

        query =query.skip(skip).limit(limit)
        if(req.query.page){
            const numTours = await Tour.countDocuments()
            if(skip>numTours) throw new Error('This page does not exist')
        }
    //execute query 
     const alltours = await query
    return res.status(200).json({
        status:"success",
        result : alltours.length,
        data: alltours
    })
  
})

exports.addTour = factory.createOne(Tour)

exports.getTour = factory.getOne(Tour,{path:'reviews'})

exports.updateTour = factory.updateOne(Tour)

exports.deletetour = factory.deleteOne(Tour)

