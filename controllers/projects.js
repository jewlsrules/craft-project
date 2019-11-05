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
  res.render('projects/home.ejs')
})

//----------------------
// Export
//----------------------
module.exports = router;
