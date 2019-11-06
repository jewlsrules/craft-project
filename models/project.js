
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name:
    { type: String, required: true },
  photo:
    { type: String },
  status:
    { type: String, required: true },
  pattern:
    { type: String },
  yarn:
    { type: String },
  due:
    { type: String },
  user: String
})

//hey mongoose, set up our model!
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
