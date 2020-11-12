const cors  = require("cors")
const express = require("express")
const app = express()
const PORT = 3000
const http = require("http").createServer(app)
const routes = require("./routes")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", routes)

http.listen(PORT, () => {
  console.log(`LOVE U ${PORT}`)
})