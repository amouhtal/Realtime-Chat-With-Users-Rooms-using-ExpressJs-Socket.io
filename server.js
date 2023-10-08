// import express package
const express = require("express");

const formatMessage = require("./utils/messages");
// create an instance of express
const app = express();
const { userJoin, getCurrentUser } = require("./utils/users");

// import http package to create a server
const http = require("http");

// create a server and pass in the express app
// This request listener is a callback function that Node.js will call for each incoming HTTP request. The request listener typically takes two arguments:
const server = http.createServer(app);
const path = require("path");
const PORT = 3000 || process.env.PORT;
const socketio = require("socket.io");

const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
const botName = "ChatCord Bot";
io.on("connection", (socket) => {
    console.log("New WS Connection...");
    socket.join(user.room);
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join("");
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit(
            "message",
            formatMessage(botName, "A user has joined the chat")
        );
    });

    socket.on("chatMessage", (msg) => {
        io.emit("message", formatMessage("USER", msg));
    });
    // Run when client disconnects
    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName,`${user.username} has left the chat`));
    });
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
