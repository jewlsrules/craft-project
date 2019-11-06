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
  res.render('projects/new.ejs')
}) // end of new project show route

// new project create route
router.post('/', (req, res) => {
  req.body.user=req.session.username;
  console.log(req.body);
  Project.create(req.body, (error, createdProject) => {
    res.redirect('/projects')
  })
}) // end of create new project post route

// All Projects/ Home Page
// projects home page route
router.get('/', (req, res) => {
  //check for logged in user:
  if(req.session.username){
    Project.find({user:req.session.username}, (error, allProjects) => {
        res.render('projects/home.ejs', {
          projects:allProjects,
          username:req.session.username
        })
      })
    } else {
      res.redirect('/')
    }
}) // end of projects homepage route

// Edit Pages
// Show Edit Page
router.get('/:id/edit', (req, res) => {
  if(req.session.username){
    Project.findById(req.params.id, (error, foundProject) => {
      res.render('projects/edit.ejs', {
        project: foundProject
      })
    })
  } else {
    res.redirect('/')
  }
}) // end of show edit project site

// Edit action route
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
  if(req.session.username){
    Project.findById(req.params.id, (error, foundProject) => {
      res.render('projects/show.ejs', {
        project: foundProject
      })
    })
  } else {
    res.redirect('/')
  }
}) // end of show individual project site


//----------------------
// Export
//----------------------
module.exports = router;
