const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({
    jobId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: [
        {
            type:String
        }
    ]
  });
  
  const Applicaion = mongoose.model('Applicaion', applicationSchema);
  
  module.exports = Applicaion;