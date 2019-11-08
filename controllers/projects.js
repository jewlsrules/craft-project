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

// New Projects
// new project page show route
router.get('/new', (req, res) => {
  if(req.session.username){
    res.render('projects/new.ejs')
  } else {
    res.redirect('/projects/all')
  }
}) // end of new project show route

// new project create route
router.post('/', (req, res) => {
  // console.log(req.body);
  // create a new project based on the schema
  req.body.user = req.session.username;
  Project.create(req.body, (error, createdProject) => {
    //go back to the user's projects page
    res.redirect('/projects')
  })
}) // end of create new project post route

//Show All Projects home page - show's all projects from users across the platform
router.get('/all', (req, res) => {
    Project.find({}, (error, allProjects) => { // look in the database and find all of the projects
      res.render('projects/index.ejs', { // show the all projects page
        projects:allProjects, // variable 'project' represents all of the projects ever.
        user: req.session.username
      })
    })
})

// User Home Page
// projects home page route
router.get('/', (req, res) => {
  if(req.session.username){  //check for logged in user:
    // based on the cookie that was set at log in/sign up, find all the projects
    Project.find({user:req.session.username}, (error, usersProjects) => {
        res.render('projects/home.ejs', { //this page will show all the current user's projects
          projects:usersProjects,
          username:req.session.username
        })
      })
    } else { //if the user isn't logged in, make them log in or sign up
      res.redirect('/projects/all')
    }
}) // end of projects homepage route

// Edit Pages
// Show Edit Page
router.get('/:id/edit', (req, res) => {
  if(req.session.username){ //make sure the user is signed in based on the cookie
    Project.findById(req.params.id, (error, foundProject) => { // find the project and render the edit page
      res.render('projects/edit.ejs', {
        project: foundProject
      })
    })
  } else { //if the user isn't signed in bring them to the sign up/log in page
    res.redirect('/projects/all')
  }
}) // end of show edit project site

// Edit a project action route
router.put('/:id', (req, res) => {
    Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, (error, updatedModel) => {
        res.redirect('/projects/'+req.params.id)
      })
}) // end of edit action route

// Delete Project
router.delete('/:id', (req, res) => {
  Project.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/projects')
  })
})

// Individual Projects
// project individual show page
router.get('/:id', (req, res) => {
  if(req.session.username){ //make sure the user is signed in
    Project.findById(req.params.id, (error, foundProject) => {
      res.render('projects/show.ejs', {
        project: foundProject,
        user: req.session.username
      })
    })
  } else {
    res.redirect('/projects/all')
  }
}) // end of show individual project site


//----------------------
// Export
//----------------------
module.exports = router;
