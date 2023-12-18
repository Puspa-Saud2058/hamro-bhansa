const express=require('express')
const router=express.Router()
const {createProduct,findProduct,findProductByIds,searchProducts, getPagination}=require('../controllers/product')
router.use(express.json());

router.post('/product',createProduct)
router.get('/product',findProduct)

router.get('/products/:id',findProductByIds)
router.get('/search-products' ,searchProducts)
router.get('/product',async(req,res)=>{
  const skipCount=(req.query.page-1)*10
  const totalCount= await Product.find().count()
  const data=await Product.find().limit(10).skip(skipCount)
   if(data){
    res.json({productList:data,totalCount})
  }
})

  module.exports=router;