const express=require('express')
const router=express.Router()
const  Product= require('../models/product');
router.use(express.json());

router.post('/product', async (req, res) => {
   const data= await Product.find()
    if(data){
      res.json({msg:`${req.body.productName} has been created`});
    }
})
    
  
  module.exports=router;