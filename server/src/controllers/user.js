const user=require('../models/user')
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

  module.exports={registerNewUser,loginUser,getAllUsers,getUserImageById}
