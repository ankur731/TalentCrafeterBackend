const mongoose = require("mongoose");
const Job = mongoose.model("Job");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 }); // Fetch all jobs from the database
    const { experienceLevel, location, jobType } = req.query;
    // console.log(jobType);
    let filteredJobs = jobs;

    if (experienceLevel) {
      // Filter jobs by experienceLevel
      filteredJobs = filteredJobs.filter((job) =>
        experienceLevel.includes(job.experienceLevel)
      );
    }

    if (location) {
      // Filter jobs by location
      filteredJobs = filteredJobs.filter((job) =>
        location.includes(job.location)
      );
    }

    if (jobType) {
      // Filter jobs by jobType
      filteredJobs = filteredJobs.filter((job) => jobType.includes(job.type));
    }

    return res.status(200).json(filteredJobs); //
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    res.status(201).json(job);
    // Fetch all jobs from the database
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const createJob = async (req, res) => {
  const {
    title,
    location,
    type,
    experienceLevel,
    minSalary,
    maxSalary,
    description,
    responsibilities,
    questions,
    skills,
  } = req.body;

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
    skills,
  });

  try {
    await newJob.save();
    console.log("Job created successfully");

    res.status(201).json({ message: "Job Created sucessfully" });
  } catch (error) {
    res.status(401).json({ message: "error in creating job", error });
  }
};

module.exports = { getJobs, getJob, createJob };
