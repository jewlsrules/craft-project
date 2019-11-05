//----------------------
// Dependencies
//----------------------
const express = require('express');
const router = express.Router();
const Project = require('../models/project.js')

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
  Project.create(req.body, (error, createdProject) => {
    res.redirect('/projects')
  })
}) // end of create new project post route

// All Projects/ Home Page
// projects home page route
router.get('/', (req, res) => {
  Project.find({}, (error, allProjects) => {
      res.render('projects/home.ejs', {
        projects:allProjects
      })
  })
}) // end of projects homepage route

// Edit Pages
// Show Edit Page
router.get('/:id/edit', (req, res) => {
  Project.findById(req.params.id, (error, foundProject) => {
    res.render('projects/edit.ejs', {
      project: foundProject
    })
  })
}) // end of show edit project site

// Edit action route
router.put('/:id', (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }, (error, updatedModel) => {
      res.redirect('/projects')
    })
}) // end of edit action route

// Individual Projects
// project individual show page
router.get('/:id', (req, res) => {
  Project.findById(req.params.id, (error, foundProject) => {
    res.render('projects/show.ejs', {
      project: foundProject
    })
  })
}) // end of show individual project site


//----------------------
// Export
//----------------------
module.exports = router;
