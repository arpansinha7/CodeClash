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

    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    socket.emit("join-room", {roomId, name});

    document.getElementById("roomCode").innerText = roomId;

    show(WaitingLobbySection);
});

socket.on("Players-Update", (players) => {
    const list = document.getElementById("players");
    list.innerHTML = "";

    players.forEach(p => {
        const li = document.createElement("li");
        li.innerText = p.name;
        list.appendChild(li);
        
    });
});
document.querySelector("#Join-Room .join").addEventListener("click", () => {

    const inputs = document.querySelectorAll("#Join-Room .name-input");

    const name = inputs[0].value;
    const roomId = inputs[1].value;

    socket.emit("join-room", {roomId, name});

    document.getElementById("roomCode").innerText = roomId;

    show(WaitingLobbySection);
});


