import React, { createContext } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.PROXY || "http://localhost:8000");

const SocketContext = createContext(socket);

const SocketProvider = ({ children }) => {
     return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
     );
};

export { SocketContext, SocketProvider };

