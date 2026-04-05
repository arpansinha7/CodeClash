import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {runCode} from './codeRunner.js';

const questions = JSON.parse(fs.readFileSync('./questions.json'));
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname , 'Client')));

const rooms = {};

function getQuestions()
{
    const easy = questions.filter(q => q.difficulty === "easy");
    const medium = questions.filter(q => q.difficulty === "medium");
    const hard = questions.filter(q => q.difficulty === "hard");

    let pool;
    const r = Math.random();

    if(r < 0.5)
        pool = easy;
    else if(r < 0.8)
        pool = medium;
    else
        pool = hard;

    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);

}

io.on('connection', (socket) => {
    console.log("User Joined :", socket.id);

    socket.on("create-room", ({roomId, name}) => {

        if(rooms[roomId])
        {
            socket.emit("error", "Room Already Exists!");
            return;
        }

        const player = {
            id : socket.id, 
            name, 
            isHost: true,
            score: 0,
            timeTaken: 0,
            submissions: 0
        };

        rooms[roomId] = {
            players: [player],
            questions: getQuestions(),
            startTime:  null
        };
        socket.join(roomId);

        socket.emit("room-created", roomId);
        io.to(roomId).emit("Players-Update", rooms[roomId].players);
    });

    socket.on("join-room", ({roomId, name})=>{

        if(!rooms[roomId])
        {
            socket.emit("error", "Room does not exists");
            return;
        }

        if(rooms[roomId].players.length >= 4)
        {
            socket.emit("room-full");
            return;
        }

        const player = {
            id : socket.id, 
            name, 
            isHost: false,
            score: 0,
            timeTaken: 0,
            submissions: 0
        };

        rooms[roomId].players.push(player);
        socket.join(roomId);

        io.to(roomId).emit("Players-Update", rooms[roomId].players);
    });


    socket.on("start-game", (roomId) => {
        const room = rooms[roomId];

        if(!room)
            return;
        
        const player = room.players.find(p => p.id === socket.id);

        if(!player || !player.isHost)
            return;

        room.startTime = Date.now();
        io.to(roomId).emit("game-started", room.questions);
    });

    socket.on("submit-code", ({roomId, code, questionId}) => {

        const room = rooms[roomId];
        if(!room) return;

        const player = room.players.find(p => p.id === socket.id);

        if(!player)
            return;

        const question = room.questions.find(q => q.id == questionId);
        const {result, passed, total, allPassed} = runCode(code, question);

        const timeTaken = Date.now() - room.startTime;
        const score = allPassed ? Math.max(100, Math.floor(1000*(1-timeTaken/300000))):0;

        player.score += score;
        player.submissions += 1;

    
        socket.emit("submission-result", {result,passed,total,allPassed,score});
        
        const sorted = [...room.players].sort((a, b) => {
            if(b.score !== a.score)
                return b.score-a.score;
            return a.timeTaken - b.timeTaken;
        });

        io.to(roomId).emit("leaderboard-update", sorted);

        const allSubmitted = room.players.every(p => p.submissions >= room.questions.length);

        if(allSubmitted)
            io.to(roomId).emit("game-over", sorted);

    });
    
    socket.on("disconnect", () => {
        for(let roomId in rooms)
        {
            rooms[roomId].players = rooms[roomId].players.filter(p => p.id !== socket.id);

            io.to(roomId).emit("Players-Update", rooms[roomId].players);

            if(rooms[roomId].players.length === 0)
                delete rooms[roomId];
        }
    });

});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})