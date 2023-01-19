import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

mongoose.connect(
	process.env.MONGO_URL!,
	() => console.log("⚡️[server]: Connected to MongoDB")
)

export default mongoose.connection;