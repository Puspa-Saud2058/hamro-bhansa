const express=require('express')
const router=express.Router()
const  Product= require('../models/product');
router.use(express.json());

router.get('/product', async (req, res) => {
   const data= await Product.find()
    if(data){
      res.json({productList:data});
    }
})
    
  
  module.exports=router;