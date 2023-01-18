import express, { Express, Request, Response } from "express";
const cors = require("cors");
require('dotenv').config()

const db = require('./db/mongo')
const userRouter = require('./routes/user')

const app: Express = express();

app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the application." });
});

app.use('/user/', userRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}.`);
});