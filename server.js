const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// Défini le dossier courant pour éviter d'appeler l'url
app.use(express.static(__dirname));
app.get('/', function (){
  res.sendFile('index.html');
});

io.sockets.on('connection', (socket) => {
  socket.on('new_user', (name) => {
    console.log(name);
  })
});

server.listen(8080);