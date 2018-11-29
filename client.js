const socket = io.connect('http://localhost:8080');
const form = document.forms[0];
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message-field');

const username = prompt('What is your username ?');
const room = prompt('What is your room ?');

socket.emit('new_user', {username, room});

socket.on('new_user', (name) => {
  chat.innerHTML += `<hr><h5>Hello <b>${name}</b> start to chat here :</h5>`;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.elements['message'].value  !== '' && form.elements['message'].value !== '' ){
    socket.emit('message', form.elements['message'].value);
  }
  messageInput.value = '';
});

socket.on('chat_init', (CHAT) => {
    chat.innerHTML = CHAT.map(function(msg) {
      return `<p>${msg.username} : ${msg.message}</p>`
    }).join('');
});

socket.on('new_message', (params) => {
  chat.innerHTML += `<p>${params.username} : ${params.message}</p>`;
});