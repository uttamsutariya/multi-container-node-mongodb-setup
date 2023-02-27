const Post = require("../models/post.model");

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		return res.status(200).json({
			status: "success",
			results: posts.length,
			data: {
				posts,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			staus: "error",
			error: error.message,
		});
	}
};

exports.getOnePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		return res.status(200).json({
			status: "success",
			data: {
				post,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			staus: "error",
			error: error.message,
		});
	}
};

exports.createPost = async (req, res) => {
	try {
		const post = await Post.create(req.body);

		return res.status(200).json({
			status: "success",
			data: {
				post,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			staus: "error",
			error: error.message,
		});
	}
};

exports.updatePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		return res.status(200).json({
			status: "success",
			data: {
				post,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			staus: "error",
			error: error.message,
		});
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);

		return res.status(200).json({
			status: "success",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			staus: "error",
			error: error.message,
		});
	}
};
