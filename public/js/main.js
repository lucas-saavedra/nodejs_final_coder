

let socket = io();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramEmail = urlParams.get('email');
let userEmail;
let userName;
socket.on('connect', () => {


  socket.emit('whoami', (user) => {
    userEmail = user.email;
    userName = user.name;
  })

  socket.on('server:messages', (messages) => {
    fetch('http://localhost:8080/templates/chatList.ejs')
      .then(response => response.text())
      .then(data => {
        let html;
        if (paramEmail) {
          const filtered = messages.filter(msg => msg.email === paramEmail);
          html = ejs.render(data, { messages: filtered, socketId: socket.id });
        } else {
          html = ejs.render(data, { messages, socketId: socket.id });
        }
        document.getElementById('chatList').innerHTML = html;
      });
  })

});

const messageForm = document.querySelector("#messageForm");
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log();
  socket.emit('client:newMessage', {
    socketId: socket.id,
    email: userEmail,
    name: userName,
    body: document.getElementById('message').value,
    type: document.getElementById('userType').value
  })
})


