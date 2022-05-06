require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Error Connecting : ${error.message}`));

const goodsSchema = new mongoose.Schema({
  uEmail: String,
  sold: Number,
  name: String,
  image: String,
  desc: String,
  price: Number,
  quantity: Number,
  supplier: String,
});

goodsSchema.set("toJSON", {
  transform: (document, returendObject) => {
    (returendObject.id = returendObject._id.toString()),
      delete returendObject._id;
    delete returendObject.__v;
  },
});

module.exports = mongoose.model("Goods", goodsSchema);
