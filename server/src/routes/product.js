const express=require('express')
const router=express.Router();

const {createProduct,findProductByIds,searchProducts, getPagination,getProductImageById, getAllProduct}=require('../controllers/product')
router.use(express.json());
const multer  = require('multer')
const Product=require('../models/product')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/image')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.ceil(Math.random()*4000)
    cb(null,  uniqueSuffix+file.originalname )
  }
})


const upload = multer({ storage: storage })
router.post('/product', upload.single('image'),createProduct)
router.post('/product',createProduct)
router.get('/products/:id',findProductByIds)
router.get('/search-products' ,searchProducts)
router.get('/product' ,getPagination)
router.post('/product',getAllProduct)
router.post('/product-image',getProductImageById)

  module.exports=router;