require("dotenv").config();
const blogsRouter = require("express").Router();
const BlogsDB = require("../model/blogs");

// Get all data
blogsRouter.get("/api/blogs", (req, res) => {
  BlogsDB.find({})
    .then((blogs) => res.json(blogs))
    .catch((err) => console.log(err.message));
});

// Get single data
blogsRouter.get("/api/blogs/:id", (req, res) => {
  BlogsDB.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => console.log(err.message));
});

// Post a new blog
blogsRouter.post("/api/blogs", (req, res) => {
  const body = req.body;

  const newBlog = new BlogsDB({
    title: body.title,
    image: body.image,
    desc: body.desc,
    date: new Date().toLocaleString(),
    author: body.author,
  });

  newBlog
    .save()
    .then((blog) => res.json(blog))
    .catch((err) => console.log(err.message));
});

// Delete a blog
blogsRouter.delete("/api/blogs/:id", (req, res) => {
  BlogsDB.findByIdAndRemove(req.params.id)
    .then(() => res.json().end())
    .catch((err) => console.log(err.message));
});

// Update a blog
blogsRouter.put("/api/blogs/:id", (req, res) => {
  body = req.body;

  const updatedBlog = {
    title: body.title,
    image: body.image,
    desc: body.desc,
    writer: body.user,
  };

  BlogsDB.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    .then((updated) => res.json(updated))
    .catch((err) => console.log(err.message));
});

module.exports = blogsRouter;
