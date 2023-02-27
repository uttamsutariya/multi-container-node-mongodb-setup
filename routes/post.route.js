const router = require("express").Router();

const { getAllPosts, getOnePost, updatePost, deletePost, createPost } = require("../controllers/post.controller");

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
