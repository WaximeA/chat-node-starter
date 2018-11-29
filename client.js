const socket = io.connect('http://localhost:8080');
const form = document.forms[0];
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message-field');

const username = prompt('What is your username ?');
const room = prompt('What is your room ?');

const COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];
let randColor = COLORS[Math.floor(Math.random() * COLORS.length)];

socket.emit('new_user', {username, room, randColor});

socket.on('new_user', (params) => {
  chat.innerHTML += `<hr><h5>Hello <b style="color: ${params.randColor}">${params.username}</b> start to chat here :</h5>`;
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
      return `<p><b style="color: ${msg.randColor}">${msg.username}</b> : ${msg.message}</p>`
    }).join('');
});

socket.on('new_message', (params) => {
  chat.innerHTML += `<p><b style="color: ${params.randColor}">${params.username}</b> : ${params.message}</p>`;
});