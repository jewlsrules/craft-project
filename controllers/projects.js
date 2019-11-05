//----------------------
// Dependencies
//----------------------
const express = require('express');
const router = express.Router();
const Fruit = require('../models/project.js')

//----------------------
// Routes
//----------------------
router.get('/', (req, res) => {
  res.send('Welcome to the Projectss Page')
})

//----------------------
// Export
//----------------------
module.exports = router;
