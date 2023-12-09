// Importing Dependencies
const express = require('express');
const cors = require('cors');
const connection = require('./db/connection');
const app = express();
require('dotenv').config()
const userRoute=require('./routes/user');
const orderRoute=require('./routes/order');
const productRoute=require('./routes/product');
app.use(express.json());
app.use(cors());
app.use(userRoute)
app.use(productRoute)
app.use(orderRoute)
console.log(process.env.SECRET_KEY)

// Setting up the Port
const port = process.env.PORT

// Establishing Database Connection
connection();

// Start the Express App
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
