const user=require('../models/user')
//const opt=require('../models/opt')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds=10;
const path = require('path')

const registerNewUser=async (req, res) => {
  try {
    console.log(req.file.filename)
      // Check if user/email/phoneNumber doesn't already exist
      const userExists = await user.findOne({ email: req.body.email });
      if (userExists) {
        res.status(409).json({ msg: 'Email already exists' });
      } else {      
      // Generate a hash password
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashPassword;
      req.body.avatar = req.file.filename;
       
        // Create a new user with a hashed password
        const data = await user.create(req.body);
          if (data) res.json({ msg: 'user registered! Please login' });
      }
    } catch (err) {
      // Handle errors
      console.log(err);
    }
  }
  const loginUser= async (req, res) => {
    const userDetails = await user.findOne({ email: req.body.email }).lean();
    if (!userDetails) {
      res.status(401).json({ msg: 'Invalid Credentials ' });
    } else {
      // Compare hashed password
      const isMatched = await bcrypt.compare(
        req.body.password,
        userDetails.password
      );
  
      if (isMatched) {
        const {password,...userInfo}=userDetails
        const token = jwt.sign({ email: req.body.email, id: userDetails._id }, process.env.SECRET_KEY);
        res.status(200).json({ msg: 'Login success',token ,userDetails:userInfo});
      } else {
        res.status(401).json({ msg: 'Incorrect match' });
      }
    }
  }

  const getAllUsers = async (req,res)=>{
    const list = await  user.find()
    res.json({list})
  }
 
const getUserImageById=async(req,res)=>{
     const userDetails= await user.findById(req.query.userId)
     if(userDetails?.avatar){
      const imgPath=path.join(__dirname ,'/../../uploads/avatars/',userDetails.avatar)
     res.sendFile(imgPath)
     }else{
      const imgPath=path.join(__dirname ,'/../../uploads/avatars/','default.jpg')
      res.sendFile(imgPath)
     }
     
}
const changePassword = async (req,res)=>{
  //1. check if phoneNumber exists
 
  const userDetail = await User.findById(req.query.userId).select('+password')
  
  const isMatched = await bcrypt.compare(req.body.oldPassword, userDetail.password)
  if(isMatched){
    const hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
    await user.findByIdAndUpdate(req.query.userId, {password: hashPassword})
     
      res.json({msg :'Password Changed'})
    }else{
      res.status(401).json({msg :'Incorrect password'})
    }
  }

const emailSend=async(req,res)=>{
  let data=await user.findOne({email:req.body.email})
  const responseType={};
  if(data){
    let otpcode=Math.floor((Math.random()*10000)+1);
    let optData=new otpcode({
      email:req.body.email,
      code:otpcode,
      expireIn:new Date().getTime()+300*1000
    })
    let otpResponse= await optData.save();
    responseType.statusText='Success'
    responseType.message='Please check your email id'
  }else{
    responseType.statusText='Error'
    responseType.message='Email d not exist'
  }
  
  res.status(200).json(responseType);
}
  module.exports={registerNewUser,loginUser,getAllUsers,getUserImageById,changePassword,emailSend}
