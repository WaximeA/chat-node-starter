const socket = io.connect('http://localhost:8080');
const form = document.forms[0];

socket.emit('new_user', 'Waxime');

socket.on('new_user', (name) => {
  // alert(name);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.elements['message'].value  !== '' && form.elements['message'].value !== '' ){

    console.log(form.elements['username'].value);
    console.log(form.elements['message'].value);

    // Envoi des valeurs au client via un event emit
    socket.emit('username', form.elements['username'].value);
    socket.emit('message', form.elements['message'].value);
  }
});