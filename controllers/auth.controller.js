const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.signUp = async (req, res) => {
	const { username, password } = req.body;
	const hashedPass = await bcrypt.hash(password, 10);

	try {
		const existUser = await User.findOne({ username });

		if (existUser) {
			return res.status(400).json({
				status: "error",
				message: "Username already taken",
			});
		}

		const newUser = await User.create({
			username,
			password: hashedPass,
		});

		req.session.user = newUser;

		return res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			status: "error",
			error: error.message,
		});
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({
				status: "error",
				message: "invalid credentials",
			});
		}

		const isCorrectPass = await bcrypt.compare(password, user.password);

		if (!isCorrectPass) {
			return res.status(400).json({
				status: "error",
				message: "invalid credentials",
			});
		}

		req.session.user = user;

		return res.status(200).json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			status: "error",
			error: error.message,
		});
	}
};
