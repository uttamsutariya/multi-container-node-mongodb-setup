const router = require("express").Router();

const { getAllPosts, getOnePost, updatePost, deletePost, createPost } = require("../controllers/post.controller");

const protect = require("../middlewares/authMiddleware");

router.route("/").get(protect, getAllPosts).post(protect, createPost);

router.route("/:id").get(protect, getOnePost).patch(protect, updatePost).delete(protect, deletePost);

module.exports = router;
