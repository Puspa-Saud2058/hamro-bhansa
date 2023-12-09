const express=require('express')
const router=express.Router()
const {registerNewUser,loginUser}=require('../controllers/user')

// Registration Endpoint
router.post('/register',registerNewUser)
  
  // Login Endpoint
  router.post('/login',loginUser)
  module.exports=router;