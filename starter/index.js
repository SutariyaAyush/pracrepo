const express = require('express');
const mongoose = require('mongoose')
const app = express();
const morgan = require('morgan');
const router = require('./routes/toursroute');
const userroute = require('./routes/userroute')
const dotenv = require('dotenv')
const AppError = require('./utils/appError')
const globalerrorhandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const reviewroute = require('./routes/reviewroute')
const bookingroute = require('./routes/bookingroute')
dotenv.config({path:'./config.env'})
//set security HTTP headers
app.use(helmet())

  
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
//limit requests from same aPI
const limiter = rateLimit({
  max:10,
  windowMs: 60*60*1000,
  message:"too many request."
})
app.use('/api',limiter) //implemented all route which have /api
//body parser , reading data from body into req.body
app.use(express.json())

//data sanitization against NOSQL query injection

//data sanitization against cross side scripting 
if(process.env.NODE_ENV === 'development')
{

    app.use(morgan('dev')) //show about http request method , api , execution time and byte in terminal
}
// app.use((req,res,next) => {
//     console.log("hello from middleware");
//     next();
// })//order matter in req,res cycle

app.use('/api/v1/users',userroute)
app.use('/api/v1/tours',router)
app.use('/api/v1/review',reviewroute)
app.use('/api/v1/booking',bookingroute)
// app.use((req,res,next) => {
//     console.log("hello from middleware"); 
//     req.requesttime = new Date().toISOString()
//     next();
// })

app.all('*',(req,res,next)=>{
  // res.status(404).json({
  //   status:'fail',
  //   message :`Can't find ${req.originalUrl} on this server`
  // })

  // const err= new Error(`Can't find ${req.originalUrl} on this server`)
  // err.status = 'fail'
  // err.statusCode=404
  //next(err) //means it will skip all the middleware and goes directly to the global err 
  next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})


app.use(globalerrorhandler)

app.listen(process.env.PORT, () => {  
    console.log('Server is running on 3000');
});

//mailtrap = #Ayush12345#
