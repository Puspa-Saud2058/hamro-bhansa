const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const customer = require('./models/customer')

const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(express.json())
app.use(cors())

const port = 4000

connection()

app.post('/register', async (req, res) => {
  try {
    //generate a hash password
    const hashPassword=await bcrypt.hash(req.body.password, saltRounds)
       req.body.password=hashPassword 
           //check if user/email/phoneNumber doesnt already exist
        const customerExists = await customer.findOne({ email: req.body.email })

    if (customerExists) {
      res.status(409).json({ msg: 'Email already exists' })
    } else {
      //create new user with hash password
            const data = await customer.create(req.body)

      if (data) res.json({ msg: 'Customer registered! Please login' })
    }
  } catch (err) {
    console.log(err)
  }
})
app.post('/login',async(req,res)=>{
  const customerDetails = await customer.findOne({ email: req.body.email })
  if(!customerDetails){
    res.status(404).json({msg:'Invalid Credentials '})
  }else{
    console.log(customerDetails.password,req.body.password)
   const isMatched=await bcrypt.compare(req.body.password,customerDetails.password)
  if(isMatched){
    res.status(200).json({msg:'Login success'})
  }
  else{
    res.status(404).json({msg:'Incorrect match'})
  }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
