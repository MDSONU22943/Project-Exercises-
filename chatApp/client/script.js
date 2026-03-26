const socket = io();

// Get username & room from URL
const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const room = params.get("room");

socket.emit("joinRoom", { username, room });

const messages = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("msg");

// Receive message
socket.on("message", (msg) => {
  const div = document.createElement("div");
  div.innerText = `${msg.user}: ${msg.text}`;
  messages.appendChild(div);
});

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chatMessage", input.value);
  input.value = "";
});