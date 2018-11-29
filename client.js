const socket = io.connect('http://localhost:8080');

socket.emit('new_user', 'Waxime');

socket.on('new_user', (name) => {
  alert(name);
});