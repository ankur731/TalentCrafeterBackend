const mongoose = require('mongoose');
const User = mongoose.model("User");
const Job = mongoose.model("Job");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const yourPassword = "someRandomPasswordHere";
const jwt = require("jsonwebtoken")


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

const signupUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: 'All fields are must'});
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with the hashed password
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });
  

  await newUser.save()
  const token = createToken(newUser._id);
  const id = newUser._id;
  console.log("User created successfully")

  // You can generate and send an authentication token here for the new user
  res.status(201).json({ message: 'Signup successful',id, email, token });
}


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email in your database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token = createToken(user._id);
  const id = user._id;
  console.log("login created successfully")

  // Password is correct; the user is authenticated
  // You can generate and send a token for authentication here
  res.status(201).json({ message: 'Login successful', id, email , token });
}


const getUsers = async (req, res) => {
  try {
        const users = await User.find(); // Fetch all jobs from the database
        res.status(200).json(users); // Send the jobs as JSON
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      }
}


const getUser = async (req, res) => {

  const {userId} = req.params

    try {
        const user = await User.findById(userId); // Fetch all jobs from the database
        res.status(201).json(user); // Send the jobs as JSON
      } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
      }
}


const updateUser = async (req, res) => {
  const userId = req.params.userId;
   
  const updatedData = req.body;
  console.log(updatedData)

  try {
    // updatedData.image = req.file.path;
    // console.log(updatedData)
     
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.file) {
      updatedData.image = req.file.path;
    }

    // Update the education data
    user.set(updatedData);
    await user.save();

    res.status(201).json({ message: 'Personal details updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const unsaveJob = async (req, res) => {

  const userId = req.params.userId;
  const jobId = req.params.jobId;

  try {
    // Find the user by ID and update the savedJobs array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the jobId to the savedJobs array if it doesn't exist
    if (user.savedJobs.includes(jobId)) {
      user.savedJobs.pull(jobId);
      await user.save();

      return res.status(201).json({ message: 'Job unsaved successfully' });
    }

    return res.status(201).json({ message: 'Job is already deleted' });
  } catch (error) {
    console.error('Error saving job:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}
const saveJob = async (req, res) => {
  const userId = req.params.userId;
  const jobId = req.params.jobId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId); // Push the job ObjectId, not the job object itself
      await user.save();

      return res.status(201).json({ message: 'Job saved successfully', user });
    }

    return res.status(201).json({ message: 'Job is already saved' });
  } catch (error) {
    console.error('Error saving job:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};






module.exports = { getUsers, signupUser, loginUser, getUser, updateUser,saveJob, unsaveJob }