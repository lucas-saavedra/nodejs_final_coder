

let socket = io();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramEmail = urlParams.get('email');

let userEmail;
let userName;
let isAdmin = false;

socket.on('connect', () => {
  socket.emit('whoami', (user) => {
    userEmail = user.email;
    userName = user.name;
    isAdmin = user.admin;
  })
  socket.on('server:messages', (messages) => {
    const badge = document.querySelector("#adminBagde");
    const submitMessage = document.querySelector("#submitMessage");
    badge.hidden = !isAdmin;
    submitMessage.innerHTML = isAdmin && paramEmail ? 'Responder' : 'Consultar';
    const href = window.location.origin;
   
    fetch(`${href}/templates/${isAdmin ? 'serverChat' : 'clientChat'}.ejs`)
      .then(response => response.text())
      .then(data => {

        if (paramEmail) {
          messages = messages.filter(msg => msg.email == paramEmail)
        }
        const html = ejs.render(data, { originUrl: href, messages, socketId: socket.id, userEmail, paramEmail });
        document.getElementById('chatList').innerHTML = html;
        window.location.href = "#bottom"
      });
  })

});

const messageForm = document.querySelector("#messageForm");
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('client:newMessage', {
    socketId: socket.id,
    email: paramEmail ? paramEmail : userEmail,
    name: paramEmail ? 'Server' : userName,
    body: document.getElementById('message').value,
    type: paramEmail ? 'system' : 'user'
  })
  messageForm.reset()
})

