import { Server } from 'socket.io';
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    
    io.emit("welcome message", "Welcome!");
});


httpServer.listen(8000);