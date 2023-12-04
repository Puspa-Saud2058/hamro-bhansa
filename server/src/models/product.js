const mongoose= require('mongoose')
const productSchema = new mongoose.Schema({
  productName: String,
  Description: String,
  price:String,
  Image:String,
  Category:String,  
   });
const Product=mongoose.model('product',productSchema);
module.exports=Product;
