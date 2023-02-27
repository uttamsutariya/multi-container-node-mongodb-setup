require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 6060;

const { MONGO_IP, MONGO_PASSWORD, MONGO_USER, MONGO_PORT } = require("./config");

mongoose.set("strictQuery", true);
mongoose
	// here @Mongo:27017 is service name defined in docker-compose, we don't need to specify ip address of that mongodb running container
	.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
	.then(() => {
		console.log("db connected");
		app.listen(port, () => console.log(`server listening on port: ${port}`));
	})
	.catch((err) => console.log(err));

// app routes
const postRoute = require("./routes/post.route");

app.use(express.json());

app.use("/api/v1/posts", postRoute);

app.get("/", (req, res) => {
	res.send("hi node-docker 👋");
});
