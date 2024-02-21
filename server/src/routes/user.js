const express=require('express')
const router=express.Router()
const {registerNewUser,getAllUsers,loginUser,getUserImageById,emailSend, changePassword}=require('../controllers/user')
const multer=require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.ceil(Math.random()*40000)
    cb(null,uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })

// Registration Endpoint
router.post('/register',upload.single('avatar'),registerNewUser)
  
  // Login Endpoint
  router.post('/login',loginUser)
  router.post('/user',getAllUsers)
  router.post('/user-avatars',getUserImageById)
  router.post('/change-password',changePassword)
  router.post('/email-send',emailSend)
  module.exports=router;