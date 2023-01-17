import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from './socket.js';
import  { Game } from './game.js';

function App() {

  const [msg, setMsg] = useState("No server connection.");
  const [room, setRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState(false);

  const socket = useContext(SocketContext);


  useEffect(() => {
    socket.on("welcome_message", function(msg) {
    setMsg(msg);
  });
  },
  []
  )

  

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("join_room", room);
    setJoinRoom(true);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <p>{msg}</p>
          {joinRoom ? <Game roomName={room}/> : <form onSubmit={handleSubmit}>
          <label>
            Enter room name:
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </label>
          <input type="submit"/>
        </form>}
      </header>
    </div>
  );
}

export default App;
