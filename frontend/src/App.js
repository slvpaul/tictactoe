import './App.css';
import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';

function App() {

  const [msg, setMsg] = useState("Message");

  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("welcome message", function(msg) {
    setMsg(msg);
  })
  },
  []
  )
  

  return (
    <div className="App">
      <header className="App-header">
        <p>{msg}</p>
      </header>
    </div>
  );
}

export default App;
