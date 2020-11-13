const cors = require("cors")
const express = require("express")
const app = express()
const PORT = 3000
const http = require("http").createServer(app)
const routes = require("./routes")
const io = require("socket.io")(http)
const generateQuery = require("./helpers/generateQuery")
const axios = require("axios")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", routes)

let onlineUsers = [];
let rooms = [];
let songs = []

io.on("connection", (socket) => {
  //console.log('a user connected');
  socket.on('letsGo', (data) => {
    const newUser = {
      id: socket.id,
      name: data
    }
    onlineUsers.push(newUser);
    socket.emit('jumpto-lobby')
    io.emit('update-onlineUsers', onlineUsers)
  })
  socket.on('get-onlineUsers', () => {
    const query = generateQuery()
    axios({
      url: `https://api.deezer.com/search?q=${query}`,
      method: "get"
    })
      .then(({ data }) => {
        data.data.forEach((element) => {
          let payload = {
            id: element.id,
            title: element.title,
            embed: element.preview
          }
          songs.push(payload)
        });
        socket.emit('update-onlineUsers', { onlineUsers, songs })
      })
      .catch(err => {
        console.log(err)
      })
  })
  socket.on('get-rooms', () => {
    socket.emit('update-room', rooms)
  })
});

http.listen(PORT, () => {
  console.log(`LOVE U ${PORT}`)
})