const mongoose = require('mongoose');
const Job = mongoose.model("Job");


const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({postedAt:-1}); // Fetch all jobs from the database
        res.status(200).json(jobs); // Send the jobs as JSON
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
      }
}
const getJob = async (req, res) => {
    const {jobId} = req.params
    try {
        const jobs = await Job.findById(jobId); // Fetch all jobs from the database
        res.status(200).json(jobs); // Send the jobs as JSON
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
      }
}
const createJob = async (req, res) => {
    const { title, location,type, experienceLevel, minSalary, maxSalary,  description, responsibilities, questions, skills, } = req.body;

    const newJob = new Job({
        title,
        location,
        type,
        experienceLevel,
        minSalary,
        maxSalary,
        description,
        responsibilities,
        questions,
        skills
    });

    try {
        
        await newJob.save();
        console.log("Job created successfully");
    
        res.status(201).json({ message: 'Job Created sucessfully'});
    } catch (error) {
        res.status(401).json({ message: 'error in creating job', error});
        
    }
}

module.exports = {getJobs, getJob, createJob};