const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(
	process.env.MONGO_URL,
	() => console.log("⚡️[server]: Connected to MongoDB"),
	{ useNewUrlParser: true }
).catch((e: Error) => {
	console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;