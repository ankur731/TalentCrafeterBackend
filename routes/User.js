const express = require('express');
const {getUsers, signupUser, loginUser, getUser, updateUser,saveJob, unsaveJob} = require("../controllers/User");
// const signupUser = require("../controllers/User")
const requireAuth = require("../middleware/requireAuth")
const upload =  require("../middleware/FileUpload")


const router = express.Router();

router.get("/user",   getUsers);
router.get("/user/:userId",   getUser);
router.put("/user/:userId", upload.single('image'), updateUser);

router.put("/user/:userId/job/:jobId", saveJob);
router.delete("/user/:userId/job/:jobId", unsaveJob);

router.post("/signup", signupUser);
router.post("/login", loginUser);


module.exports = router