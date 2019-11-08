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

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs')
})

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    req.session.id = createdUser.id
    res.redirect('/projects')
  })
})

router.get('/:id', (req, res) => {
  if(req.session.username){
    User.findOne({username: req.session.username}, (error, foundUser) => {
      // console.log('req.session.username = ' + req.session.username);
      // console.log('found user is: ' + foundUser);
      res.render('users/profile.ejs', {
        user:foundUser
      })
    })
  } else {
    res.redirect('/')
  }
})

//----------------------
// Export
//----------------------
module.exports = router;
