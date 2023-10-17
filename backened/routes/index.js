const express = require("express");

const router = express.Router();

// Testing Rout
router.get("/test", (req, res) => res.json({ msg: "Test is working fine!" }));

// user
// login
// register
// logout
// refresh ==> JWT

// Blog
// CRUD
// create
// Read
// Read all blogs
// Read blogs by id
// Update
// Delete

// Comment
// create commennt
// read commennt
// Read comment by blog id

// Export it

module.exports = router;
