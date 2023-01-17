import { Server } from 'socket.io';
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost"
    }
});

io.on("connection", (socket) => {
    
    socket.emit("welcome_message", "Connected to server. Welcome!");

    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        console.log("room joined");

        if (io.sockets.adapter.rooms.get(roomName).size === 2) {
            socket.emit("start_game", { start: true, symbol: "x"});
            socket.to(roomName).emit("start_game", { start: false, symbol: "o"});
        }
    });

    socket.on("game_update", (id, roomName, startGame, symbol) => {
        socket.to(roomName).emit("client_listener", { id: id, start: startGame, symbol: symbol });
    });

    socket.on("game_over", (roomName) => {
        socket.emit("over_msg", "You win!");
        socket.to(roomName).emit("over_msg", "Other player wins!");
    });

    socket.on("tie_game", (roomName) =>{
        socket.emit("tie_msg", "Tie game!");
        socket.to(roomName).emit("tie_msg", "Tie game!");
    });

});



httpServer.listen(8000);