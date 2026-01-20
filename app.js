import express from "express"
import cors from "cors"

const app = express()
const allowedOrigins =
  process.env.FRONTENDS?.split(",") || ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

import homeRoutes from './routes/home.js'
import userRoutes from './routes/user.js'

app.use("/", homeRoutes);
app.use("/user", userRoutes);


export { app }