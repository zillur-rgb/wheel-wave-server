const productsRouter = require("express").Router();
const ProductsDB = require("../model/products");

//Get all the products
productsRouter.get("/", (req, res) => {
  ProductsDB.find({}).then((products) => res.json(products));
});

//Get single data
productsRouter.get("/:id", (req, res) => {
  ProductsDB.findById(req.params.id).then((product) => res.json(product));
});

//Delete single data
productsRouter.delete("/:id", (req, res) => {
  ProductsDB.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => console.log(error.message));
});

// Post a data
productsRouter.post("/", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  const newProduct = new ProductsDB({
    userEmail: body.email,
    name: body.name,
    image: body.image,
    desc: body.desc,
    price: body.price,
    quantity: body.quantity,
    supplier: body.supplier,
  });

  newProduct.save().then((savedProduct) => {
    res.json(savedProduct);
  });
});

// Update a data
productsRouter.put("/:id", (req, res) => {
  const body = req.body;
  const updatedProduct = {
    userEmail: body.email,
    sold: body.sold,
    name: body.name,
    image: body.image,
    desc: body.desc,
    price: body.price,
    quantity: body.quantity,
    supplier: body.supplier,
  };
  ProductsDB.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((error) => console.log(error.message));
});

module.exports = productsRouter;
