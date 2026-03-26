const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const { addUser, removeUser, getRoomUsers } = require("./users");
const { getCurrentUser } = require("./users");

// Serve static files
app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", (socket) => {
  console.log("New user connected");

  // Join Room
  socket.on("joinRoom", ({ username, room }) => {
    const user = addUser(socket.id, username, room);
    socket.join(user.room);

    // Welcome message
    socket.emit("message", {
      user: "System",
      text: `Welcome ${user.username}!`,
    });

    // Broadcast to others
    socket.broadcast.to(user.room).emit("message", {
      user: "System",
      text: `${user.username} has joined the chat`,
    });

    // Send room users
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Chat message
  socket.on("chatMessage", (msg) => {
  const user = getCurrentUser(socket.id);

  if (user) {
    io.to(user.room).emit("message", {
      user: user.username,
      text: msg,
    });
  }
});

  // Disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "System",
        text: `${user.username} left the chat`,
      });
    }
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));