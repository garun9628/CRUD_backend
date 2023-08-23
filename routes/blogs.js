const express = require("express");
const router = express.Router();
const Blog = require("../models/Blogs");

// Route 1: Fetch all blogs belong to a user using GET request "/api/blogs/fetchallblogs".
router.get("/fetchalllogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 2: Add a blog to a signed user using POST "/api/blogs/addblog" belong to user which is already signed in.
router.post("/addblog", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author,
    });
    res.send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 3: Update a existing blog using PUT "/api/blogs/updateblog".
router.put("/updateblog/:id", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    let newBlog = {};
    if (title) {
      newBlog.title = title;
    }
    if (content) {
      newBlog.content = content;
    }
    if (author) {
      newBlog.author = author;
    }

    // Find the blog to be updated and update it.
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }

    // Allow updation only if blog is found.
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newBlog },
      { new: true }
    );
    res.json({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 4: Delete a existing blog using DELETE "/api/blogs/deleteblog".
router.delete("/deleteblog/:id", async (req, res) => {
  try {
    // Find the blog to be deleted and delete it.
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if blog is found.
    blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ Success: "Blog has been deleted", blog });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
