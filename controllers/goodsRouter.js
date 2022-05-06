require("dotenv").config();
const jwt = require("jsonwebtoken");
const goodsRouter = require("express").Router();
const GoodsDB = require("../model/goods");

//Get all the products
goodsRouter.get("/api/goods", (req, res) => {
  GoodsDB.find({}).then((products) => res.json(products));
});

// Get Single Data
goodsRouter.get("/api/goods/:id", (req, res) => {
  GoodsDB.findById(req.params.id).then((good) => res.json(good));
});

// Delete single data
goodsRouter.delete("/api/goods/:id", (req, res) => {
  GoodsDB.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => console.log(err.message));
});

// Posting Data to
goodsRouter.post("/api/goods", (req, res) => {
  const body = req.body;

  const newGood = new GoodsDB({
    uEmail: body.uEmail,
    name: body.name,
    image: body.image,
    sold: body.sold,
    desc: body.desc,
    price: body.price,
    quantity: body.quantity,
    supplier: body.supplier,
  });

  newGood.save().then((savedGood) => {
    res.json(savedGood);
  });
});

// Login with jwt
goodsRouter.post("/api/login", async (req, res) => {
  const user = req.body;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  res.send({ accessToken });
});

// Updating data
goodsRouter.put("/api/goods/:id", (req, res) => {
  const body = req.body;

  const updatedGood = {
    uEmail: body.uEmail,
    name: body.name,
    image: body.image,
    sold: body.sold,
    desc: body.desc,
    price: body.price,
    quantity: body.quantity,
    supplier: body.supplier,
  };

  GoodsDB.findByIdAndUpdate(req.params.id, updatedGood, { new: true })
    .then((updated) => res.json(updated))
    .catch((err) => console.log(err.message));
});

module.exports = goodsRouter;
