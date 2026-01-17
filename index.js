import dotenv from "dotenv"
dotenv.config()

import { app } from './app.js'

const port = process.env.PORT

app.listen(port || 8000, () => console.log(`⚙️ Server is running at port : ${port}`))