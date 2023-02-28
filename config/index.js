module.exports = {
	MONGO_IP: process.env.MONGO_IP || "mongo",
	MONGO_PORT: process.env.MONGO_PORT || 27017,
	REDIS_HOST: process.env.REDIS_HOST || "redis",
	REDIS_PORT: process.env.REDIS_PORT || 6379,
	SESSION_SECRET: process.env.SESSION_SECRET,
};
