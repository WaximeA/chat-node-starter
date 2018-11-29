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
  // envoi le name au client via l'event "new_user"
  socket.on('new_user', (name) => {
    // console.log(name);

    // renvoi à l'utilisateur courant
    socket.emit('new_user', name);
    // renvoi à tous les "clients" sauf le courant
    socket.broadcast.emit('new_user', name);
  });
});

server.listen(8080);