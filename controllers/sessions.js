//----------------------
// Dependencies
//----------------------
const express = require('express');
const router = express();
const methodOverride = require('method-override') //convert strings in forms
const mongoose = require('mongoose') //for database
const session = require('express-session') //for cookies
const bcrypt = require('bcrypt') //for password encryption
const Project = require('../models/project.js')
const User = require('../models/user.js')

//----------------------
// Routes
//----------------------

// Show Log In Page
router.get('/login', (req, res) => {
  res.render('sessions/login.ejs')
})

// Log In check route
router.post('/', (req, res)=>{
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(foundUser === null){
      res.redirect('/sessions/login')
    } else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesPasswordMatch){
        //if the password is correct, set a cookie of their username
        req.session.username = foundUser.username
        res.redirect('/projects')
      } else {
        res.redirect('/sessions/login')
      }
    }
  })
}) // end of log in check route

//----------------------
// Export
//----------------------
module.exports = router;
