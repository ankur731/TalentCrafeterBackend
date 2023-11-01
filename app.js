const express = require("express")
const mongoose = require("mongoose");
const multer = require("multer")
const cors = require('cors');
const upload = require("./middleware/FileUpload")
const path = require('path'); // Node.js path module for working with file paths

require('dotenv').config()
const uri = process.env.DB_HOST
const Port = process.env.PORT

const app = express();
// S2EsgxQo9RKMy7Cl
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}
  
connectDB();



require("./models/Job")
require("./models/User")
require("./models/Education")
require("./models/Experience")


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static('uploads'))

app.use(require("./routes/Job"));
app.use(require("./routes/User"));
app.use(require("./routes/Education"));
app.use(require("./routes/Experience"));

// app.get("/", (req, res) => {
//     res.send("Hello world")
// })

app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
})