'use strict';

const io = require('socket.io-client');
const socket = io('https://rock-paper-scissors-df68.onrender.com/');
const readline = require('readline');

socket.on('connect', () => {
  console.log('Connected to the game server');
});

socket.on('message', (message) => {
  console.log(message);
});

socket.on('result', (result) => {
  console.log(result);
  promptForMove();
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function promptForMove() {
  rl.question('Enter your move (rock, paper, or scissors), or enter "exit" to quit: ', (move) => {
    if (move.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
    } else {
      socket.emit('move', move);
    }
  });
}

promptForMove();
