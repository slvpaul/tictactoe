import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from './socket.js';
import './game.css';

export function Game({ roomName }) {

    const socket = useContext(SocketContext);

    const [startGame, setStartGame] = useState(false);
    const [endGame, setEndGame] = useState(null);
    const [symbol, setSymbol] = useState("");
    const [board, setBoard] = useState([
        {id: 1, symbol: null},
        {id: 2, symbol: null},
        {id: 3, symbol: null},
        {id: 4, symbol: null},
        {id: 5, symbol: null},
        {id: 6, symbol: null},
        {id: 7, symbol: null},
        {id: 8, symbol: null},
        {id: 9, symbol: null},
    ]);

    useEffect(() => {
        checkWinCondition();
    });

    useEffect(() => {

        socket.on("start_game", (msg) => {
            setStartGame(msg.start);
            setSymbol(msg.symbol);
        });

        socket.on("client_listener", (msg) => {

            setBoard(prevState => {
                const newState = prevState.map(obj => {
                  if (obj.id === msg.id) {
                        while (obj.symbol === null) {
                        return {...obj, symbol: msg.symbol};
                    }}
                    return obj;
                
                })
                return newState;
            })
            setStartGame(msg.start);
            
        });

        socket.on("over_msg", (msg) => {
            setEndGame(msg);
        });

        socket.on("tie_msg", (msg) => {
            setEndGame(msg);
        });

        return () => {
            socket.off("start_game");
        }
    }, []);

    function handleGameClick(id) {
        setBoard(prevState => {
            const newState = prevState.map(obj => {
               if (obj.id === id) {
                    while (obj.symbol === null) {
                    return {...obj, symbol: symbol};
                }}
                return obj;
            })
            return newState;
        })
        socket.emit("game_update", id, roomName, startGame, symbol);
        setStartGame(false);
    }

    

    function checkWinCondition() {
            if (board[0].symbol === symbol && board[1].symbol === symbol && board[2].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[0].symbol === symbol && board[3].symbol === symbol && board[6].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[0].symbol === symbol && board[4].symbol === symbol && board[8].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[3].symbol === symbol && board[4].symbol === symbol && board[5].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[6].symbol === symbol && board[7].symbol === symbol && board[8].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[1].symbol === symbol && board[4].symbol === symbol && board[7].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[2].symbol === symbol && board[5].symbol === symbol && board[8].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else if (board[2].symbol === symbol && board[4].symbol === symbol && board[6].symbol === symbol) {
                socket.emit("game_over", roomName);
                return;
            }
            else {
                let tie = true;
                for (let i = 0; i < board.length; i++) {
                    if (board[i].symbol === null) {
                        tie = false;
                    }
                }
                while (tie === true) {
                    socket.emit("tie_game", roomName);
                    return;
                }

                while (tie === false) {
                    return;
                }
            }
    };

    return (

        <div>
            {symbol === null && <p>Waiting for other player.</p>}
            {startGame === false && <p className="playstop"></p>}
            {symbol && <p>Your symbol is {symbol}</p>}
            {endGame ? <p className="gameover">{endGame}</p> :
            <div className='container'>
             {board.map(obj => {
                return (
                <div className="cell" key={obj.id} onClick={() => handleGameClick(obj.id)}>
                    <div className="symbol">{obj.symbol}</div>
                </div>
                )
             })}
            </div>}
        </div>

    )
}