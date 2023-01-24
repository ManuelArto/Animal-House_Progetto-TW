import express, { Express } from "express"
import helmet from "helmet"
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { errorLogger, errorResponder } from './middleware/error'
import connectMongo from './db/mongo'
import userRouter from './routes/user'

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.use('/user/', userRouter)

// Middlewares
app.use(helmet())
app.use(errorLogger())
app.use(errorResponder())

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`)
  await connectMongo()
})