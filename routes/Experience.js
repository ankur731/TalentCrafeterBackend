const express = require('express');
const { getExperience, createExperience, deleteExperience } = require("../controllers/Experience")
const requireAuth = require("../middleware/requireAuth")


const router = express.Router();

router.get("/experience/:experienceId",   getExperience);
router.post("/experience/:userId", createExperience);
// router.put("/experience/:userId/:experienceId", updateExperience);
router.delete("/experience/:userId/:experienceId", deleteExperience);

module.exports = router