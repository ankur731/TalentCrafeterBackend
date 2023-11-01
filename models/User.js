const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    },
    location:{
        type:String,
    },
    image:{
        type:String,
    },
    role:{
        type:String,
    },
    description:{
        type:String,
    },
    education: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Education'
        }
    ],
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
        }
    ],
    certification: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Certification'
        }
    ],
    skills: [
        { type: String }
    ],
    application: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ],
    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    joiningDate: {
        type: Date,
        default: Date.now
    },
    isAdmin:{
        type:Boolean,
        require:true
    },
})

mongoose.model("User",UserSchema)