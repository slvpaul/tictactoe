import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './socket.js'; 
import './index.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </SocketProvider>
);
