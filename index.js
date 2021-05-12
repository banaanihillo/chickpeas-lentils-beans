const app = require("./app")
const http = require("http")
const history = require("connect-history-api-fallback")
app.use(history)

const server = http.createServer(app)

const PORT = process.env.PORT || 9001
server.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}.`)
})

server.get("/healthcheck", (_request, response) => {
  response.send("OK")
})
