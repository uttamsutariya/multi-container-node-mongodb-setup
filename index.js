const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("hi node-docker 👋");
});

const port = process.env.PORT || 6060;

app.listen(port, () => console.log(`server listening on port: ${port}`));
