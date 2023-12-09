const  Product= require('../models/product');
const { findProductById, searchProduct } = require('../controllers/product');
const { search } = require('./user');


const createProduct=async (req, res) => {
    const data = await Product.create(req.body);
        if(data){
        res.json({msg:`${req.body.productName} has been created`});
      }
  }
  const findProduct=async (req, res) => {
    const data = await Product.find();
      if(data){
        res.json({productList:data});
      }
  }
  const findProductByIds= async (req, res) => {
    const data = await Product.findById(req.params.id);
      if(data){
        res.json({productList:data});
      }
  }
  const searchProducts=async (req, res) => {
    const data=await Product.find({productName:{$regex:req.query.name}})
     res.json({productList:data})
   }
  module.exports={createProduct,findProduct,findProductByIds,searchProducts}