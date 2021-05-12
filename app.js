const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const history = require("connect-history-api-fallback")
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use(express.static("dist"))
app.use(history())

const baseURL = process.env.MONGODB_URI
const connectToMongo = () => {
    mongoose.connect(baseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}
try {
    connectToMongo()
    console.log("Successfully connected to Mongo.")
} catch (error) {
    console.log("Could not connect to Mongo for some reason.")
    console.log(error)
}

const PORT = process.env.PORT || 9001
app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}.`)
})

const playerRouter = require("./controllers/playerRouter")
app.use("/api/players", playerRouter)
const teamRouter = require("./controllers/teamRouter")
app.use("/api/teams", teamRouter)

app.get("/healthcheck", (_request, response) => {
  response.send("OK")
})
//
