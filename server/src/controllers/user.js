const user=require('../models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds=10;

const registerNewUser=async (req, res) => {
    try {
      // Generate a hash password
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashPassword;
  
      // Check if user/email/phoneNumber doesn't already exist
      const userExists = await user.findOne({ email: req.body.email });
  
      if (userExists) {
        res.status(409).json({ msg: 'Email already exists' });
      } else {
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
  module.exports={registerNewUser,loginUser}
