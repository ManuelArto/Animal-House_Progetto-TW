import express, { Express, Request, Response }  from "express";
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require("cors");

import dotenv from 'dotenv';
dotenv.config();

require('./db/mongo.ts')

const app: Express = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}.`);
});