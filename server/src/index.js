const express = require('express')
const app = express()
const port = 4000

app.get('/users', (req, res) => {
  res.send('Hello users')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})