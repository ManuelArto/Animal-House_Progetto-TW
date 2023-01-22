import express, { Express, Request, Response } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectMongo from './db/mongo'
import userRouter from './routes/user'

const app: Express = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/user/', userRouter)

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`)
  await connectMongo()
})