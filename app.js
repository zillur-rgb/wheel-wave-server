require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let productsSample = [
  {
    id: 1,
    name: "Cycle",
    Price: 235,
  },
  {
    id: 2,
    name: "Bike",
    price: 400,
  },
  {
    id: 3,
    name: "Rickshaw",
    price: 230,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/products", (req, res) => {
  res.json(productsSample);
});

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = productsSample.find((product) => product.id === id);
  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  filteredProducts = productsSample.filter((product) => product.id !== id);

  res.status(204).end();
});

app.post("/api/products", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }
  const product = {
    id: Math.round(Math.random() * 20),
    name: body.name,
    price: body.price,
  };

  productsSample = productsSample.concat(product);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running on port 5000"));
