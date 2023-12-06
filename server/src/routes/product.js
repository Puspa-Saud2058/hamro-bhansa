const express=require('express')
const router=express.Router()
const  Product= require('../models/product');
router.use(express.json());

router.post('/product', async (req, res) => {
  const data = await Product.create(req.body);
      if(data){
      res.json({msg:`${req.body.productName} has been created`});
    }
})
router.get('/product', async (req, res) => {
  const data = await Product.find();
    if(data){
      res.json({productList:data});
    }
})

router.get('/products/:id' , async (req, res) => {
  const data = await Product.findById(req.params.id);
    if(data){
      res.json({productList:data});
    }
})
router.get('/search-products' , async (req, res) => {
 const data=await Product.find({productName:{$regex:req.query.name}})
  res.json({productList:data})
})
  module.exports=router;