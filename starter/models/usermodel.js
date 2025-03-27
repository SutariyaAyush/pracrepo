const mongoose = require('mongoose');
const crypto = require('crypto')
// const { validate } = require('./toursmodel');
const validator = require('validator')
const bcrypt = require('bcrypt')
const { DateTime } = require('luxon'); //for timezone difference

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
    maxlength: [10, 'A user name must have less or equal then 10 characters'],
  },
  email:{
    type:String,
    unique:true,
    require:[true,'email must be required'],
    lowercase:true ,
    validate:[validator.isEmail,'please provide valid email']
  },
  photo :{
    type:String,
    default:'default.jpg'
  },
  role:{
    type:String,
    enum:['user','guide','lead-guid','admin'],
    default:'user'
  },
  password : {
    type: String,
    required:[true,'please provide password'],
    minlength:[6,'pwd must be 6 character'],
    select:false
  },
  passwordconfirm : {
    type:String,
    required:[true,'please provide confirm password'],
    validate : {
        validator: function(val){
            return val === this.password
        },
        message:"password are not same "
    }
  },
  passwordchangedAt : Date,
  passwordResetToken : String,
  passwordResetExpires : Date,
  active:{
    type:Boolean,
    default:true,
    select:false
  }
});

userSchema.pre('save',async function(next){
  //only run this function if pwd is actually modified
    if(!this.isModified('password')) return next();

     
    this.password =await bcrypt.hash(this.password,12)
    
    this.passwordconfirm = undefined

    next()
})   //between data recive and data save in database 

userSchema.pre('save',function(next){
  if(!this.isModified('password')|| this.isNew) return next()

    this.passwordchangedAt = Date.now() - 1000
    next()
})
userSchema.pre(/^find/,function(next){
  //this point to the current query
  this.find({active:{$ne: false}})
  next()
})
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  console.log("inside changedpwedafter");
  if(this.passwordchangedAt){
    const changedtimestamp = parseInt(this.passwordchangedAt.getTime()/1000)
    return JWTTimestamp < changedtimestamp
  }

  //false means not change
  return false
}

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  console.log({resetToken},this.passwordResetToken);
  // console.log((Date.now()+ 10* 60 * 1000));
  // const now = DateTime.local()
  
  // this.passwordResetExpires = now.ts + 15 * 60 * 1000
  
  this.passwordResetExpires = Date.now() + 10*60*1000
  return resetToken
}

const User = mongoose.model('User',userSchema)

module.exports = User