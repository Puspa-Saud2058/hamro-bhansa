const mongoose=require('mongoose')
const { Schema } = mongoose;

const categories = new Schema({
 categoryName: String, // String is shorthand for {type: String}
 maxWeight: Number,
 productName:String,
 price:Number,
});

const Category = mongoose.model('Category', categories);
module.exports = Category