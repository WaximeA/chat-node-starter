const socket = io.connect('http://localhost:8080');
const form = document.forms[0];
const chat = document.getElementById('chat');

const username = prompt('What is your username ?');
const room = prompt('What is your room ?');

socket.emit('new_user', {username, room});

socket.on('new_user', (name) => {
  // alert(name);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.elements['message'].value  !== '' && form.elements['message'].value !== '' ){
    socket.emit('message', form.elements['message'].value);
  }
});

socket.on('chat_init', (CHAT) => {
  chat.innerHTML = CHAT.map(function(msg) {
    return `<p>${msg.username} : ${msg.message}</p>`
  });
});

socket.on('new_message', (params) => {
  chat.innerHTML += `<p>${params.username} : ${params.message}</p>`;
});