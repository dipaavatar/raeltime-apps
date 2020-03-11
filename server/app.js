const express =  require('express')
const app = express()
var server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000

app.get('/', (req,res) => {
  res.status(200).json({ message: 'Connected' })
})

io.on('connection', function (socket) {
  socket.emit('news', { hello1: 'Connecting to server' })
  socket.on('my other event', function (data) {
    console.log(data)
    socket.broadcast.emit('dataP', { chat: data.chat, username: data.username })
  })
  socket.on('onlinePerson', function(data) {
    // let clients = io.engine.clients
    
    socket.emit('onlinePerson2', {persons: Object.keys(io.engine.clients)})
  })

  socket.on('turnOfClientConnection', function() {
    socket.disconnect()
    console.log('data')
  })
})

server.listen(port, () => {
  console.log('Server listen on port ' + port)
})