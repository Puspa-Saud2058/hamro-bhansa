const mongoose= require('mongoose')
const optSchema = new mongoose.Schema({
  email: String,
  code:String,
  expireIn:Number, 
})
 const opt=mongoose.model('opt',optSchema,'opt');
module.exports=opt;
