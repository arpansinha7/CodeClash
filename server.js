import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname , 'Client')));

io.on('connection', (socket) => {
    console.log("User Joined :", socket.id);

    socket.on("join-room", ({roomId, name }) => {
        socket.join(roomId);
        console.log(name, "Joined", roomId);

        io.to(roomId).emit("players-update", {
            id: socket.id,
            name
        });
    });

    socket.on('disconnect', () => {
    console.log("User Disconnected: ", socket.id);

    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})