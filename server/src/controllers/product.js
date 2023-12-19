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
   const getAllProducts=async(req,res)=>{
    const list= await Product.find()
    res.json({list})
   }
   const getPagination=async(req,res)=>{
    const skipCount=(req.query.page-1)*10
    const totalCount= await Product.find().count()
    const data=await Product.find().limit(10).skip(skipCount)
     if(data){
      res.json({productList:data,totalCount})
    }
  }
  module.exports={createProduct,findProduct,findProductByIds,searchProducts,getAllProducts,getPagination}