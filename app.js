require("dotenv").config();
const express = require("express");
const app = express();
const ProductsDB = require("./model/products");
const productsRouter = require("./controllers/productsRouter");

app.use(express.json());
app.use("/api/products", productsRouter);

// let productsSample = [
//   {
//     id: 1,
//     name: "Cycle",
//     Price: 235,
//   },
//   {
//     id: 2,
//     name: "Bike",
//     price: 400,
//   },
//   {
//     id: 3,
//     name: "Rickshaw",
//     price: 230,
//   },
// ];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// app.get("/api/products", (req, res) => {
//   ProductsDB.find({}).then((products) => res.json(products));
// });

// app.get("/api/products/:id", (req, res) => {
//   ProductsDB.findById(req.params.id).then((product) => res.json(product));
// });

// app.delete("/api/products/:id", (req, res) => {
//   ProductsDB.findByIdAndRemove(req.params.id)
//     .then((result) => res.status(204).end())
//     .catch((error) => console.log(error.message));
// });

// app.post("/api/products", (req, res) => {
//   const body = req.body;
//   if (!body) {
//     return res.status(400).json({
//       error: "Content Missing",
//     });
//   }

//   const newProduct = new ProductsDB({
//     name: body.name,
//     image: body.image,
//     desc: body.desc,
//     price: body.price,
//     quantity: body.quantity,
//     supplier: body.supplier,
//   });

//   newProduct.save().then((savedProduct) => {
//     res.json(savedProduct);
//   });
// });

// app.put("/api/products/:id", (req, res) => {
//   const body = req.body;
//   const updatedProduct = {
//     name: body.name,
//     image: body.image,
//     desc: body.desc,
//     price: body.price,
//     quantity: body.quantity,
//     supplier: body.supplier,
//   };
//   ProductsDB.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
//     .then((updatedProduct) => {
//       res.json(updatedProduct);
//     })
//     .catch((error) => console.log(error.message));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running on port 5000"));
