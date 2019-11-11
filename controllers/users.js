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
//show sign up page
router.get('/signup', (req, res) => {
  res.render('users/signup.ejs')
}) // end of show sign up page

//create new user route
router.post('/', (req, res) => {
  // encrypt the password before passing it into the new user object
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    // set the cookie so that we know the user is logged in
    req.session.id = createdUser.id
    //bring the new user to the main page
    res.redirect('/projects')
  })
}) // end of create new user route

//show user's page
router.get('/:id', (req, res) => {
  //check if the user is loggedin first
  if(req.session.username){
    //find the user and display their information
    User.findOne({username: req.session.username}, (error, foundUser) => {
      // console.log('req.session.username = ' + req.session.username);
      // console.log('found user\'s username is: ' + foundUser);
      Project.find({user:req.session.username}, (error, foundProjects) => {
        //to see and edit their own profile
        if(req.session.username === foundUser.username){
          res.render('users/profile.ejs', {
            user:foundUser,
            projects:foundProjects
          })
          //to view another user's profile
        } else {
          res.render('users/otherprofile.ejs', {
            user:foundUser,
            projects:foundProjects
          })
        }
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
