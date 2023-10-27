const mongoose = require('mongoose');


const educationSchema = new mongoose.Schema({
    university: { type: String },
    degree: { type: String },
    type: { type: String },
    from: { type: Date },
    to: { type: Date },
    grade:{type: String },
    description: { type: String },
  });
  
  const Education = mongoose.model('Education', educationSchema);
  
  module.exports = Education;