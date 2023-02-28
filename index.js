require("dotenv").config();

const {
	MONGO_IP,
	MONGO_PASSWORD,
	MONGO_USER,
	MONGO_PORT,
	REDIS_HOST,
	REDIS_PORT,
	SESSION_SECRET,
} = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
	legacyMode: true,
	socket: {
		port: REDIS_PORT,
		host: REDIS_HOST,
	},
});

redisClient.connect().catch((error) => {
	console.error(error);
});

const app = express();

const port = process.env.PORT || 3000;

mongoose.set("strictQuery", true);
mongoose
	.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
	.then(() => {
		console.log("db connected");
		app.listen(port, () => console.log(`server listening on port: ${port}`));
	})
	.catch((err) => console.log(err));

// app routes
const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");

app.use(express.json());
app.use(cors());
// ip accessible to server (do this if having ip related stuff at serverside bcz we setup nginx)
app.enable("trust proxy");
app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: SESSION_SECRET,
		cookie: {
			name: "user-session",
			secure: false,
			resave: true,
			saveUninitialized: true,
			httpOnly: true,
			maxAge: 600000,
		},
	})
);

app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", userRoute);

app.get("/api/v1", (req, res) => {
	res.send("hi node-docker 👋");
});
