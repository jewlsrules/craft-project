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
  if(!req.session.username){
    res.render('sessions/login.ejs')
  } else {
    res.redirect('/projects')
  }
}) // end of show log in page

// Log In route
router.post('/', (req, res)=>{
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(foundUser === null){
      res.redirect('/sessions/login')
    } else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesPasswordMatch){
        //if the password is correct, set a cookie of their username
        // console.log("this is the log in post route, found user is : "+ foundUser);
        req.session.username = foundUser.username
        res.redirect('/projects')
      } else {
        res.redirect('/sessions/login')
      }
    }
  })
}) // end of log in check route

//session delete (log out)
router.post('/destroy', (req, res)=>{ //any route will work
	req.session.destroy((err)=>{
		if(err){
			//do something if destroying the session fails
      console.log(err);
		} else {
      //do something if destroying the session succeeds
      res.redirect('/')
		}
	});
});
//end of log out

//----------------------
// Export
//----------------------
module.exports = router;
