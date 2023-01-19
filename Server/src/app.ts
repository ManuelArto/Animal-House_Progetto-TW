import express, { Express, Request, Response } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import db from './db/mongo'
import userRouter from './routes/user'

const app: Express = express();

app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the application." });
})

app.use('/user/', userRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}.`)
})