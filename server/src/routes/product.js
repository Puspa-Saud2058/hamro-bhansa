const express=require('express')
const router=express.Router()
const  Product= require('../models/product');
router.use(express.json());

router.post('/product', async (req, res) => {
  const data = await Product.create({ productName: req.body.productName });
    if(data){
      res.json({msg:`${req.body.productName} has been created`});
    }
})
router.get('/product', async (req, res) => {
  console.log("test")
  const data = await Product.find();
    if(data){
      res.json({productList:data});
    }
})
    
  
  module.exports=router;