const catchAsync = require('../utils/catchAsync');
const User = require('./../models/usermodel');
const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const appError = require('../utils/appError');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const crypto = require('crypto')

const generatetoken = (newUser) => {
  return jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendResponce = (statusCode,res,user) =>{
  const token = generatetoken(user._id)
  const cookieoptions = {
    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIREIN * 24 *60*60*1000),
    
    httpOnly : true 
  }
  if(process.env.NODE_ENV === 'production') cookieoptions.secure = true
  res.cookie('jwt',token,cookieoptions)
  user.password = undefined
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    },
  });
}


exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const url=`${req.protocol}://${req.get('host')}/me`
  console.log(url);
  await new Email(newUser,url).sendWelcome()
  sendResponce(201,res,newUser)
});

exports.login = catchAsync(async (req, res,next) => {
  console.log("printing login body",req.body);
  const { email, password } = req.body;
  //1) check email and pwd exist
  if (!email || !password) {
    next(new AppError('please provide email and password ', 400));
  }
  console.log("user is exist");
  //2) check if user exist && pwd is corresct
  const user = await User.findOne({ email }).select('+password'); //bcz in model we write as false in select
  console.log('user data ', user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('pwd or email is incorrect', 400));
  }

  //3)if everything ok,send token to client
  sendResponce(201,res,user)
});

exports.protect =catchAsync( async (req, res, next) => {
  //1)getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('token is not found', 403));

  //2)verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  //3)Check if user still exists
  console.log("user id",decoded.id);
  const freshUser =await User.findById(decoded.id) //await vagar aakho schema ne avu bdhu aapi dese
  console.log("printing freshUser",freshUser);
  if(!freshUser){
    return next(new AppError('The user not exist',401))
  }

  //4)CHeck if user changed password after the token was isuued
   if(freshUser.changedPasswordAfter(decoded.iat)){
    return next(
      new AppError('user recently changed pwd')
    )
   }

   //grant access to protected route
   req.user = freshUser
  next();
})

exports.restrictTo = (...roles) => {
  return (req,res,next) =>{
    //roles ['admin','lead-guid']
    if(!roles.includes(req.user.role) ){
      return next(
        new AppError('you do not have permmision',403)
      )
    }
    next()
  }
}

exports.forgotPassword = catchAsync ( async(req,res,next) => {
  //1) Get user based on Posted email
  const user = await User.findOne({email: req.body.email})

  if(!user) {
    return next(new AppError('there is no user with given email',404))
  }



  //2)generate the random reset token
  const resetToken = user.createPasswordResetToken()
  await user.save({validateBeforeSave:false})
  //3) snd it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

  const message = `Forgot your password? submit a PATCH request with your new password and passwordconfirm to : ${resetURL}`
  try{
  await new Email(user,resetURL).sendpassword()
  
  res.status(200).json({
    status:"success",
    message:"token send to email"
  })
}catch(err){
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined

  await user.save({validateBeforeSave:false})

  return next(
    new AppError('fail to send email',400) 
  )
}
})

exports.resetPassword = catchAsync( async(req,res,next) => {
   //1) get user based in the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken:hashedToken,
      passwordResetExpires: {$gt : Date.now()}
    })
   //2) iff token has not expired , and there id user ,set the new pwd
    if(!user){
      return next(new AppError('token is invalid or has expired',400))
    }
    user.password = req.body.password
    user.passwordconfirm = req.body.passwordconfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
   //3) update changedpwdat property for the user 

   //4) log the user in ,send jwt
   const token = generatetoken(user._id)

   res.status(200).json({
    status: 'success',
    token
   })
})

exports.updatePassword = catchAsync(async(req,res,next)=>{
  //1)get user from collection 
  const email= req.user.email
  
  const user = await User.findOne({email}).select('+password');
    
  //2) check if posted pwd is correct 
  console.log(req.body.password);
  console.log(user.password);
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError('pwd is incorrect', 400));
  }
  //3) if so , update pwd
  user.password = req.body.newpassword
  user.passwordconfirm = req.body.newconfirmpassword
  await user.save()
  //4) log user in ,send jwt
  const token = generatetoken(user._id)
  res.status(200).json({
    status:"success",
    token
  })
})