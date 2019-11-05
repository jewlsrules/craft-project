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
    { type: String }
})

//hey mongoose, set up our model!
const Pattern = mongoose.model('Pattern', projectSchema);

module.exports = Pattern;
