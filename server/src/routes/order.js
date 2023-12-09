const express=require('express')
const router=express.Router()
const order = require('../models/order');
router.post('/product', async (req, res) => {
    const data = await Product.create(req.body);
        if(data){
        res.json({msg:`${req.body.productName} has been created`});
      }
  })  
  module.exports=router;
  