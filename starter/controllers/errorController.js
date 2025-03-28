const AppError = require("../utils/appError")

const handleCastErrorDB =err => {
  const message = `Invalid ${err.path} : ${err.value}`
  return new AppError(message , 400)
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)
  const message = `Duplicate field value: ${value}.please use another value`
  return new AppError(message , 400)
}

const handleValidationErrorDB = err =>{
  const errors = Object.values(err.error.map(el => el.message ))

  const message= `Invalid input data. ${errors.join('. ')}`
  return new AppError(message , 400)
}

const handleJWTError = () => new AppError('Invalid token. please login first',401)

const handleTokenExpired = () => new AppError('your token is expired',401)

const sendErrorDev = (err,res) =>{
  res.status(err.statusCode).json({
    status : err.status,
    error:err,
    message : err.message,
    stack : err.stack
  })
}

const sendErrorProd = (err,res) =>{
  if(err.isOperational){

    res.status(err.statusCode).json({
      status : err.status,
      message : err.message
    })
  }
  else {
    console.error('ERROR',err)
    res.status(500).json({
      status : 'error',
      message: "something went wrong"
    })
  }
}
module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500 
    err.status = err.status || 'error'
  
    if(process.env.NODE_ENV === 'development'){
      sendErrorDev(err,res)
    }else if(process.env.NODE_ENV == 'production'){
      let error = {...err}
      if(error.name === 'CastError') error=handleCastErrorDB(error)
      if(error.code === 11000) error = handleDuplicateFieldsDB(error)
      if(error.code === "ValidationError") error = handleValidationErrorDB(error)
      if(error.name === 'JsonWebTokenError') error = handleJWTError()
      if(error.name === 'TokenExpired') error = handleTokenExpired()

      sendErrorProd(error,res) 
    }
} 