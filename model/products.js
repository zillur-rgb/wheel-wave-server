require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log(`connecting to url ${url}`);

mongoose
  .connect(url)
  .then((res) => console.log("Connected to MongoDB"))
  .catch("Error connecting to MongoDB");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  desc: String,
  price: Number,
  quantity: Number,
  supplier: String,
});

productSchema.toSet("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id;
    delete returnedObject.__V;
  },
});

module.exports = mongoose.model("Products", productSchema);