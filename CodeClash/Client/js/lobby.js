const socket = io();
const action = localStorage.getItem("action");

const createSection = document.getElementById("Create-Room");

const joinSection = document.getElementById("Join-Room");

const WaitingLobbySection = document.getElementById("Waiting-Lobby");

function show(section)
{
     createSection.style.display = "none";
     joinSection.style.display = "none";
     WaitingLobbySection.style.display = "none"
     section.style.display = "block";
}

if(action === "create") 
    show(createSection);
else if(action === "join")  
    show(joinSection);

document.querySelector("#Create-Room .create").addEventListener("click", () => {

    const name = document.querySelector("#Create-Room .name-input").value;
    if(!name)
    {
        alert("Enter you name!");
        return;
    }
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("playerName", name);
    socket.emit("create-room", {roomId, name});

    
});

socket.on("room-created", (roomId) => {
    document.getElementById("roomCode").innerText = roomId;
    show(WaitingLobbySection);
});

socket.on("Players-Update", (players) => {
    
    show(WaitingLobbySection);
    const list = document.getElementById("players");
    list.innerHTML = "";

    const roomId = localStorage.getItem("roomId");
    document.getElementById("roomCode").innerText = roomId;
    players.forEach(p => {
        const li = document.createElement("li");
        li.innerText = p.isHost ? p.name + "(Host)" : p.name;
        list.appendChild(li);
        
    });

    const myId = socket.id;
    const me = players.find(p => p.id === myId);

    const startBtn = document.querySelector("#Waiting-Lobby .create");

    if(me && me.isHost)
        startBtn.style.display = "block";
    else
        startBtn.style.display = "none";

    
});

socket.on("game-started", (questions) => {
    localStorage.setItem("questions", JSON.stringify(questions));
    window.location.href = "game.html";
});

document.querySelector("#Join-Room .join").addEventListener("click", () => {

    const inputs = document.querySelectorAll("#Join-Room .name-input");

    const name = inputs[0].value;
    const roomId = inputs[1].value;
    if(!name || !roomId)
    {
        alert("Enter your name and room code!");
        return;
    }
    
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("playerName", name);
    socket.emit("join-room", {roomId, name});
});



socket.on("room-full", () => {
    alert("Room is full");
});

socket.on("error", (msg)=> {
    alert(msg);
});

document.querySelector("#Waiting-Lobby .create").addEventListener("click" , () => {
        const roomId = localStorage.getItem("roomId");
        socket.emit("start-game", roomId);
 });