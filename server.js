import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname , 'Client')));

const rooms = {};

io.on('connection', (socket) => {
    console.log("User Joined :", socket.id);

    socket.on("join-room", ({roomId, name})=>{

        if(!rooms[roomId])
        {
            rooms[roomId] = [];
        }

        if(rooms[roomId].length >= 4)
        {
            socket.emit("room-full");
            return;
        }

        const player = {id : socket.id, name};

        rooms[roomId].push(player);
        socket.join(roomId);

        io.to(roomId).emit("Players-Update", rooms[roomId]);
    });

    socket.on("disconnect", () => {
        for(let roomId in rooms)
        {
            rooms[roomId] = rooms[roomId].filter(p => p.id !== socket.id);

            io.to(roomId).emit("Players-Update", rooms[roomId]);

            if(rooms[roomId].length === 0)
                delete rooms[roomId];
        }
    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})