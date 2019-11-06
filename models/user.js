const mongoose = require('mongoose');
const Project = require('./project.js')

const userSchema = new mongoose.Schema({
  firstName:
    { type: String, required: true, unique: true },
  lastName:
    { type: String, required: true },
  email:
    { type: String, required: true },
  username:
    { type: String, required: true },
  password:
    { type: String, required: true },
  projects: [Project.schema]
})

//hey mongoose, set up our model!
const User = mongoose.model('User', userSchema);

module.exports = User;
