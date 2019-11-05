//----------------------
// Dependencies
//----------------------
const express = require('express');
const router = express.Router();
const Project = require('../models/project.js')

//----------------------
// Routes
//----------------------

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

// projects home page route
router.get('/', (req, res) => {
  Project.find({}, (error, allProjects) => {
      res.render('projects/home.ejs', {
        projects:allProjects
      })
  })
}) // end of projects homepage route

//----------------------
// Export
//----------------------
module.exports = router;
