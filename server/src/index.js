const express = require('express')
const connection=require('./db/connection')
const customer=require('./models/customer')
const app = express()
app.use(express.json())
const port = 4000
connection()
app.post('/register', async(req, res) => {
  await customer.create(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})