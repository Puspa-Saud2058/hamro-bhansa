const mongoose= require('mongoose')
const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price:String,
  image:String,
  category:String,  
   });
const Product=mongoose.model('Product',productSchema);
module.exports=Product;
