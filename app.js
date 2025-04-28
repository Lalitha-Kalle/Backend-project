const express = require("express")
const http = require("http")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./databases/database")
dotenv.config()

const server = http.createServer(app)

connectDB()
.then(()=> {
  console.log("DB connected")
  server.listen(process.env.PORT, () => {
    console.log(
      `App is running on port ${process.env.PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
    )
  })
})
.catch((e) => {
  console.log("DB connection failed" + e.message);
})
