const mongoose = require("mongoose");
const User = mongoose.model("User");
const Experience = mongoose.model("Experience");


const createExperience = async (req, res) => {
    const {  company, role, type, from, to, description } = req.body;
    
    const newExperience = new Experience({
        company,
        role,
        type,
        from,
        to,
        description
    });
  
    newExperience
      .save()
      .then((experience) => {
        const userId = req.params.userId;
        User.findByIdAndUpdate(
          userId,
          { $push: { experience: experience._id } },
          { new: true }
        )
          .then((updatedUser) => {
            res.status(201).json(updatedUser);
          })
          .catch((error) => {
            res.status(500).json({ error: "Failed to add experience" });
          });
  
        //   res.status(201).json(education);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to add experience" });
      });
};


const getExperience = async (req, res) => {
    const { experienceId } = req.params;
    try {
      const experience = await Experience.findById(experienceId); // Fetch all jobs from the database
      res.status(201).json(experience); // Send the jobs as JSON
    } catch (error) {
      console.error("Error fetching experience details:", error);
      res.status(500).json({ error: "Failed to fetch experienec details" });
    }
  };
  
  
module.exports = { createExperience, getExperience };
