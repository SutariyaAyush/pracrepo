const express = require('express')
const { signup, login, forgotPassword, resetPassword, updatePassword, protect, restrictTo } = require('../controllers/authController')
const { getAllUser, updateMe, deleteMe, updateUser, deleteUser, getMe, getUser, uploadUserPhoto, resizeUSerPhoto } = require('../controllers/userController')
const { addreview } = require('../controllers/reviewController')
const multer=require('multer')

const userrouter = express.Router()

userrouter.post('/signup',signup)
userrouter.post('/login',login)
userrouter.post('/forgotPassword',forgotPassword)
userrouter.patch('/resetPassword/:token',resetPassword)
userrouter.patch('/updatepassword',protect,updatePassword)
userrouter.patch('/updateme',protect,uploadUserPhoto,resizeUSerPhoto,updateMe)
userrouter.delete('/deleteme',protect,deleteMe)
userrouter.patch('/updateuser',protect,updateUser)
userrouter.delete('/deleteuser',protect,deleteUser)
userrouter.get('/me',protect,getMe,getUser) 
userrouter.get('/',getAllUser)
module.exports = userrouter   