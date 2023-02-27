const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Post must have title"],
		},
		body: {
			type: String,
			required: [true, "Post must have body"],
		},
	},
	{ versionKey: false }
);

module.exports = new mongoose.model("Post", postSchema);
