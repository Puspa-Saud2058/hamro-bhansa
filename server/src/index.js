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
    const hashPassword=await bcrypt.hash(req.body.password, saltRounds)
    console.log(hashPassword)
    const customerExists = await customer.findOne({ email: req.body.email })

    if (customerExists) {
      res.status(409).json({ msg: 'Email already exists' })
    } else {
      const data = await customer.create(req.body)

      if (data) res.json({ msg: 'Customer registered! Please login' })
    }
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
