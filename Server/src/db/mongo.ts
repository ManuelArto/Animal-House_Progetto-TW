import mongoose from 'mongoose'

mongoose.set("strictQuery", false)

async function mongoConnect() {
	try {
		await mongoose.connect(process.env.MONGO_URL!)
		console.log("⚡️[server]: Connected to MongoDB")
	} catch (error) {
		console.error("Could not connect to db")
		process.exit(1)
	}
}

export default mongoConnect

