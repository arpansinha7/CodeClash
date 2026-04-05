window.addEventListener('monacoReady', () => {
const socket = io();

const roomId = localStorage.getItem("roomId");
const questions = JSON.parse(localStorage.getItem("questions"));
document.getElementById("question-title").innerText = questions[0].title;
document.getElementById("question").innerText = questions[0].description;

let currentIndex = 0;
let timeLeft = 60;

document.getElementById("question").innerText = questions[currentIndex].description;

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentIndex = parseInt(btn.dataset.index);
        document.getElementById("question-title").innerText = questions[currentIndex].title;
        document.getElementById("question").innerText = questions[currentIndex].description;
        window.monacoEditor.setValue(questions[currentIndex].starterCode);
    });
});

const timerE1 = document.getElementById("timer");

const timer = setInterval(() => {
    timeLeft--;
    timerE1.innerText = "Time Left: " + timeLeft;

    if(timeLeft <= 0)
    {
        clearInterval(timer);
        alert("Time's up!");
    }
}, 1000);  

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => {

    clearInterval(timer);
    console.log("Submit clicked");
    const code = window.monacoEditor.getValue();
    const questionId = questions[currentIndex].id;


    socket.emit("submit-code", {
        roomId: localStorage.getItem("roomId"),
        code,
        questionId
    });

    alert("Submitted!");
});

socket.on("leaderboard-update", (players) => {
    
    console.log("leaderboard recieved");
    let result = "Leaderboard:\n";

    players.forEach((p, i) => {
        result += `${i+1}. ${p.name} - ${p.score}\n`;
    });

    alert(result);
});

socket.on("submission-result",({passed, total, allPassed, score}) => {
    alert(`${passed}/${total} test cases passed! ${allPassed ? 'Correct' + score + ' points' :'No Points'}`);
});

socket.on("game-over", (players)=> {
    alert("game over");
});
});