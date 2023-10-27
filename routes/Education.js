const express = require('express');
const { createEducation, getEducation, updateEducation, deleteEducation } = require("../controllers/Education")

const requireAuth = require("../middleware/requireAuth")


const router = express.Router();

router.get("/education/:educationId",   getEducation);
router.post("/education/:userId", createEducation);
router.put("/education/:userId/:educationId", updateEducation);
router.delete("/education/:userId/:educationId", deleteEducation);
// router.get("/user/:id",   getUser);
// router.post("/login", loginUser);

module.exports = router