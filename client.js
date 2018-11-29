const socket = io.connect('http://localhost:8080');
const form = document.forms[0];
const chat = document.getElementById('chat');

const username = prompt('What is your username ?');
socket.emit('new_user', username);

socket.on('new_user', (name) => {
  // alert(name);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.elements['message'].value  !== '' && form.elements['message'].value !== '' ){
    socket.emit('message', form.elements['message'].value);
  }
});

socket.on('new_message', (message) => {
  chat.innerHTML += `Nouveau message reçu: ${message}`;
});