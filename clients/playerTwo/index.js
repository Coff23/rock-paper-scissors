'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:3002');
const readline = require('readline');

socket.on('connect', () => {
  console.log('Connected to the game server');
});

socket.on('message', (message) => {
  console.log(message);
});

socket.on('result', (result) => {
  console.log(result);
  rl.question();
});

// Make a move
// function makeMove(move) {
//   socket.emit('move', move);
// }

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Make a move
rl.question('Enter your move (rock, paper, or scissors): ', (move) => {
  socket.emit('move', move);
  rl.close();
});
