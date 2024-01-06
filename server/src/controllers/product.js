const  Product= require('../models/product');
const { search } = require('./user');
const path=require ('path')
const createProduct=async (req, res) => {
     req.body.image = req.file.filename
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
    const totalCount= await Product.find().count()
    const skipCount=(req.query.page-1)*3
    const data=await Product.find().limit(3).skip(skipCount)
     if(data){
      res.json({productList:data,totalCount})
    }
         }     
         const getAllProduct = async (req,res)=>{
          const list = await  Product.findById()
          res.json({list})
        }
      
      const getProductImageById=async(req,res)=>{   
        console.log(__dirname)
      const productDetails= await Product.findById(req.query.productId)
      console.log(productDetails)
      if(productDetails?.image){
       const imgPath = path.join(__dirname +'/../../uploads/image/',productDetails.image)
        res.sendFile(imgPath)
      }else{
        const imgPath = path.join(__dirname+'/../../uploads/image/','default.jpg')
        res.sendFile(imgPath)
      }
      }
      module.exports={createProduct,findProduct,findProductByIds,searchProducts,getAllProducts,getPagination,getProductImageById,getAllProduct}