const protect = (req, res, next) => {
	const user = req.session.user;

	if (!user) {
		return res.status(401).json({
			status: "error",
			message: "unauthorized",
		});
	}

	req.user = user;

	next();
};

module.exports = protect;
