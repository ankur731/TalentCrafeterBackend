const express = require('express');
const {getUsers, signupUser, loginUser, getUser, updateUser} = require("../controllers/User");
// const signupUser = require("../controllers/User")
const requireAuth = require("../middleware/requireAuth")


const router = express.Router();

router.get("/user",   getUsers);
router.get("/user/:userId",   getUser);
router.put("/user/:userId", updateUser);

router.post("/signup", signupUser);
router.post("/login", loginUser);


module.exports = router