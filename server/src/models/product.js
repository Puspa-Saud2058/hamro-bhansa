const mongoose= require('mongoose')
const productSchema = new mongoose.Schema({
  ProductPrice: String, // String is shorthand for {type: String}
  productName: String,
   });
const Product=mongoose.model('product',productSchema);
module.exports=Product;
