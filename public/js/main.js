const socket = io();
const charForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//Join chatroom
socket.emit("joinRoom", {username, room});

socket.on("message", (message) => {
    console.log(message);
    outputMessage(message);
    chatMessage.scrollTop = chatMessage.scrollHeight;
}
);

charForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get message text
    const msg = e.target.elements.msg.value;
    // Emit message to server
    socket.emit("chatMessage", msg);

    // Clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div); 
}