const mongoose= require('mongoose')
const customerSchema = new mongoose.Schema({
  fullname: String, // String is shorthand for {type: String}
  email: String,
  password: String,
   });
const customer=mongoose.model('customer',customerSchema);
module.exports=customer
