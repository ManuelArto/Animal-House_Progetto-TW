import express, { Express } from "express"
import cors from 'cors'
import morgan from 'morgan'
import helmet from "helmet"
import dotenv from 'dotenv'
dotenv.config()
import { errorLogger, errorResponder } from './middleware/error'
import connectMongo from './db/mongo'

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
import userRouter from './routes/user'
import animalsRouter from './routes/animals'
import productsRouter from './routes/products'
import scoresRouter from './routes/scores'
import headquartersRouter from './routes/headquarters'
import threadsRouter from './routes/threads'
app.use('/user/', userRouter)
app.use('/animals/', animalsRouter)
app.use('/products/', productsRouter)
app.use('/scores/', scoresRouter)
app.use('/sedi/', headquartersRouter)
app.use('/threads/', threadsRouter)

// Middlewares
app.use(helmet())
app.use(errorLogger())
app.use(errorResponder())

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`)
  await connectMongo()
})