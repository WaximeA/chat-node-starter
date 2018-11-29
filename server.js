const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Défini le dossier courant pour éviter d'appeler l'url
app.use(express.static(__dirname));
app.get('/', function (){
  res.sendFile('index.html');
});

server.listen(8080);