
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

document.querySelector("#Create-Room .create").addEventListener("click", () => show(WaitingLobbySection));
document.querySelector("#Join-Room .join").addEventListener("click", () => show(WaitingLobbySection));


