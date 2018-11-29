const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.get('/', function (){
  res.sendFile('index.html');
});

io.sockets.on('connection', (socket) => {
  socket.on('new_user', (name) => {
    socket.username = name;
    socket.emit('new_user', name);
    socket.broadcast.emit('new_user', name);
  });

  socket.on('message', (message) => {
    const params = {
      username: socket.username,
      message: message
    };
    socket.emit('new_message', params);
    socket.broadcast.emit('new_message', params);
  });
});

server.listen(8080);