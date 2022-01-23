const socket = io("http://localhost:8000");

//   get Dom elements in respective js variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");

// append function - user inside chat
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  audio.play();
};

// when user joins emit event
const name = prompt("Enter your name to join !");
socket.emit("new-user-joined", name);

// when a new user joins ,let the server knows
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// if new user joins, receive name from server
socket.on("receive", (data) => {
  append(`${data.name}:${data.message}`, "left");
});

// user on leaves append the info to container
socket.on("leave", (data) => {
  append(`${name} : left from the chat`, "left");
});



// on send button form submission - sent the message to server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You :${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
