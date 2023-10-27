const mongoose = require("mongoose");
const User = mongoose.model("User");
const Education = mongoose.model("Education");

const createEducation = async (req, res) => {
  const { university, degree, type, from, to, grade, description } = req.body;
  const newEducation = new Education({
    university,
    degree,
    type,
    from,
    to,
    grade,
    description,
  });

  newEducation
    .save()
    .then((education) => {
      const userId = req.params.userId;
      User.findByIdAndUpdate(
        userId,
        { $push: { education: education._id } },
        { new: true }
      )
        .then((updatedUser) => {
          res.status(201).json(updatedUser);
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to add education" });
        });

      //   res.status(201).json(education);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to add education" });
    });
};

const getEducation = async (req, res) => {
  const { educationId } = req.params;
  try {
    const education = await Education.findById(educationId); // Fetch all jobs from the database
    res.status(201).json(education); // Send the jobs as JSON
  } catch (error) {
    console.error("Error fetching education details:", error);
    res.status(500).json({ error: "Failed to fetch education details" });
  }
};

const updateEducation = async (req, res) => {
  const userId = req.params.userId;
    const educationId = req.params.educationId;
    const updatedData = req.body;

  try {
    const education = await Education.findById(educationId);

    if (!education) {
      return res.status(404).json({ message: 'Education nahi found' });
    }

    // Update the education data
    education.set(updatedData);
    await education.save();

    res.status(201).json({ message: 'Education updated successfully', education });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEducation = async (req, res) => {
//   const educationId = req.params.educationId;
//   const userId = req.params.userId;
  const { educationId, userId } = req.params;
    console.log(educationId)
    
    //   Delete the education record
    Education.findByIdAndRemove(educationId)
    .then((deletedEducation) => {
        if (!deletedEducation) {
            return res.status(404).json({ error: 'Education not found' });
        }

        User.findByIdAndUpdate(
            userId,
            { $pull: { education: educationId } },
            { new: true }
        ).then((updatedUser) => {
              res.status(201).json(updatedUser)
          })
    })
        .catch((error) => {
        
      console.error('Error deleting education:', error);
      res.status(500).json({ error: 'Failed to delete education' });
    });
};

module.exports = {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
};
