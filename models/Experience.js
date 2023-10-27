const mongoose = require('mongoose');


const experienceSchema = new mongoose.Schema({
    company: { type: String },
    role: { type: String },
    type: { type: String },
    from: { type: Date },
    to: { type: Date },
    description: { type: String },
  });
  
  const Experience = mongoose.model('Experience', experienceSchema);
  
  module.exports = Experience;