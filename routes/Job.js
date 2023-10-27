const express = require('express');
const {getJobs, getJob, createJob} = require("../controllers/Job");
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

router.get("/jobs",  getJobs);
router.get("/jobs/:jobId",  getJob);
router.post("/job",  createJob);


module.exports = router