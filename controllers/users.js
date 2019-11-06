//----------------------
// Dependencies
//----------------------
const express = require('express');
const router = express();
const methodOverride = require('method-override') //convert strings in forms
const mongoose = require('mongoose') //for database
const session = require('express-session') //for cookies
const Project = require('../models/project.js')
const User = require('../models/user.js')

//----------------------
// Routes
//----------------------

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs')
})

//----------------------
// Export
//----------------------
module.exports = router;
