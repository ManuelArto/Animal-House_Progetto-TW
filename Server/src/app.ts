import express, { Express } from "express"
import cors from 'cors'
import morgan from 'morgan'
import helmet from "helmet"
import dotenv from 'dotenv'
dotenv.config()
import { constants } from "./utils/const"
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
import reservationsRouter from './routes/reservations'
import gameAnimalsRouter from './routes/gameAnimals'
import adminUserRouter from './routes/adminUsers'

app.use('/api/user/', userRouter)
app.use('/api/animals/', animalsRouter)
app.use('/api/products/', productsRouter)
app.use('/api/scores/', scoresRouter)
app.use('/api/sedi/', headquartersRouter)
app.use('/api/threads/', threadsRouter)
app.use('/api/reservations/', reservationsRouter)
app.use('/api/gameAnimals/', gameAnimalsRouter)
app.use('/api/adminUser/', adminUserRouter)

// Static routes
app.use("/game", express.static(constants.game))
app.use("/frontoffice", express.static(constants.frontoffice))
app.use("/backoffice", express.static(constants.backoffice))


// Middlewares
app.use(helmet())
app.use(errorLogger())
app.use(errorResponder())

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`)
  await connectMongo()
})