const mongoose = require('mongoose');


const certificationSchema = new mongoose.Schema({
    name: { type: String },
    provider: { type: String },
    certificateId: { type: String },
    from: { type: Date },
    to: { type: Date },
    description: { type: String },
  });
  
  const Certification = mongoose.model('Certification', certificationSchema);
  
  module.exports = Certification;