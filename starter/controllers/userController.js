const User = require('../models/usermodel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handleFactory')
const multer = require('multer')
const sharp= require('sharp')



// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });
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

exports.uploadUserPhoto = upload.single('photo')

exports.resizeUSerPhoto =catchAsync( async(req,res,next)=>{
    if(!req.file) return next()
    
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`
    
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/users/${req.file.filename}`)

    next()
})
const filterObj = (obj,...allowedFields) =>{
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObj[el] = obj[el]
        }
    })
    return newObj
}
exports.getAllUser =catchAsync( async(req,res,next) =>{
    const user = await User.find()
    res.status(200).json({
        status:"success",
        result: user.length,
        data:user
    })
})

exports.updateMe = catchAsync(async (req,res,next)=>{

    //1) create error if user post pwd data
    if(req.body.password || req.body.passwordconfirm){
        return next(new AppError('pwd is not allowed',401))
    }

    //2) Update user document
    //req.body.role= "admin" and token update na thava joi atle 
    const filteredBody = filterObj(req.body,'name','email')
    if (req.file) filteredBody.photo = req.file.filename;
    console.log(req.user.id);
    const updateduser = await User.findByIdAndUpdate(req.user.id,filteredBody,{new:true,runValidators:true})

    res.status(200).json({
        status:"success",
        data:updateduser
    }) 
})

exports.getMe = catchAsync(async (req,res,next)=>{
    req.params.id = req.user.id
    next()
})

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})

    res.status(204).json({
        status:"success",
        data:null
    })
})
exports.getUser= factory.getOne(User)
exports.deleteUser = factory.deleteOne(User)
exports.updateUser = factory.updateOne(User)
