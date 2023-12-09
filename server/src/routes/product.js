const express=require('express')
const router=express.Router()
const {createProduct,findProduct,findProductByIds,searchProducts}=require('../controllers/product')
router.use(express.json());

router.post('/product',createProduct)
router.get('/product',findProduct)

router.get('/products/:id',findProductByIds)
router.get('/search-products' ,searchProducts)
  module.exports=router;