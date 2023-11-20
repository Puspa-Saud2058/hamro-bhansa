const express = require('express')
const cors=require('cors')
const connection=require('./db/connection')
const customer=require('./models/customer')
const app = express()
app.use(express.json())
app.use(cors())
const port = 4000
connection()
app.post('/register', async(req, res) => {
  const customerExists=await customer.findOne({email:req.body.email})
  if(customerExists){
    res.status(409).json({msg:'Email already exist'})
  }
  else{
   const data= await customer.create(req.body)
   if(data)res.json({msg:'customer register'})
  }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})