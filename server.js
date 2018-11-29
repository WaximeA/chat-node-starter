const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let CHAT = {};

app.use(express.static(__dirname));
app.get('/', function (){
  res.sendFile('index.html');
});

io.sockets.on('connection', (socket) => {
  socket.on('new_user', (params) => {
    socket.username = params.username;
    socket.room = params.room;

    socket.join(params.room);
    socket.emit('chat_init', CHAT[socket.room] || []);
    socket.emit('new_user', params.username);
  });

  socket.on('message', (message) => {
    const params = {
      username: socket.username,
      message: message
    };

    if (CHAT[socket.room] === undefined){
      CHAT[socket.room] = [];
    }

    CHAT[socket.room].push(params);
    socket.emit('new_message', params);
    socket.to(socket.room).emit('new_message', params);
  });
});

server.listen(8080);