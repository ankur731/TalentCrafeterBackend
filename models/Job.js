const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  location: { type: String },
  type: { type: String },
  experienceLevel: { type: String },
  minSalary: { type: String },
  maxSalary: { type: String },
  description: { type: String },
  responsibilities: [{ type: String }],
  questions: [{ type: String }],
  skills: [{ type: String }],
  postedAt: { type: Date, default: Date.now },
  deadline: { type: Date },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
