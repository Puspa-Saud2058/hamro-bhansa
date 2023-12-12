const mongoose= require('mongoose')
const userSchema = new mongoose.Schema({
  fullname: String, // String is shorthand for {type: String}
  email: String,
  address:String,
  password: String,
  role:{
    type:String,
    enum:['admin','user'],
    default:'user'
  },
  password:String,
  avatar:String
   });
const user=mongoose.model('user',userSchema);
module.exports=user;
