require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err.message));

const blogsSchema = new mongoose.Schema({
  title: String,
  image: String,
  desc: String,
  date: Date,
  author: String,
});

blogsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blogs", blogsSchema);
