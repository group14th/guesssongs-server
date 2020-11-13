const cors  = require("cors")
const express = require("express")
const app = express()
const PORT = 3000
const http = require("http").createServer(app)
const routes = require("./routes")
const io = require("socket.io")(http)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", routes)

let onlineUsers = [];
let rooms = [];

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
      socket.emit('update-onlineUsers', onlineUsers)
    })
});

http.listen(PORT, () => {
  console.log(`LOVE U ${PORT}`)
})