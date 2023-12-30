const express=require('express')
const router=express.Router()
const {createProduct,findProduct,findProductByIds,searchProducts, getPagination}=require('../controllers/product')
router.use(express.json());

router.post('/product',createProduct)
router.get('/products/:id',findProductByIds)
router.get('/search-products' ,searchProducts)
router.get('/product' ,getPagination)

  module.exports=router;