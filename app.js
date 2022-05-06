require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const goodsRouter = require("./controllers/goodsRouter");
const blogsRouter = require("./controllers/blogsRouter");
app.use(cors());
app.use(express.json());
app.use(goodsRouter);
app.use(blogsRouter);
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running on port 5000"));
