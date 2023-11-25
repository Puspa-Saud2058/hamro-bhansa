// Importing Dependencies
const express = require('express');
const cors = require('cors');
const connection = require('./db/connection');
const customer = require('./models/customer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Creating an Express App
const app = express();
app.use(express.json());
app.use(cors());

// Setting up the Port
const port = 4000;

// Establishing Database Connection
connection();

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    // Generate a hash password
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;

    // Check if user/email/phoneNumber doesn't already exist
    const customerExists = await customer.findOne({ email: req.body.email });

    if (customerExists) {
      res.status(409).json({ msg: 'Email already exists' });
    } else {
      // Create a new user with a hashed password
      const data = await customer.create(req.body);

      if (data) res.json({ msg: 'Customer registered! Please login' });
    }
  } catch (err) {
    // Handle errors
    console.log(err);
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const customerDetails = await customer.findOne({ email: req.body.email });
  if (!customerDetails) {
    res.status(404).json({ msg: 'Invalid Credentials ' });
  } else {
    // Compare hashed password
    const isMatched = await bcrypt.compare(
      req.body.password,
      customerDetails.password
    );

    if (isMatched) {
      res.status(200).json({ msg: 'Login success' });
    } else {
      res.status(404).json({ msg: 'Incorrect match' });
    }
  }
});

// Start the Express App
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
