const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    name: { type: String },
    business: { type: String },
    location: { type: String },
    employees: { type: String },
    since: { type: Date },
    description: { type: String },
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
  });
  
  const Company = mongoose.model('Company', companySchema);
  
  module.exports = Company;