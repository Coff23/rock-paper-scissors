'use strict';

const http = require('http');
const socketIO = require('socket.io');

// Create an HTTP server
const server = http.createServer();
const io = socketIO(server);

// Store connected clients
let player1 = null;
let player2 = null;

// Game variables
let player1Move = null;
let player2Move = null;

// Handle incoming socket connections
io.on('connection', (socket) => {
  // Assign players when two clients are connected
  if (!player1) {
    player1 = socket;
    player1.emit('message', 'You are Player 1');
  } else if (!player2) {
    player2 = socket;
    player2.emit('message', 'You are Player 2');

    // Start the game
    startGame();
  } else {
    socket.emit('message', 'Game room is full');
    socket.disconnect(true);
  }

  // Handle incoming moves from clients
  socket.on('move', (move) => {
    if (socket === player1) {
      player1Move = move;
      player1.emit('message', `You chose ${move}`);
    } else if (socket === player2) {
      player2Move = move;
      player2.emit('message', `You chose ${move}`);
    }

    if (player1Move && player2Move) {
      const result = determineWinner(player1Move, player2Move);
      if (player1) player1.emit('result', result);
      if (player2) player2.emit('result', result);

      // Reset the game
      setTimeout(() => {
        player1Move = null;
        player2Move = null;
        startGame();
      }, 2000);
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    // Reset the game if a player disconnects
    if (socket === player1 || socket === player2) {
      resetGame();
      startGame();
    }
  });
});

if (player1) {
  player1.on('message', (message) => {
    console.log(message);
  });
}
if (player2) {
  player2.on('message', (message) => {
    console.log(message);
  });
}

// Start the server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Game logic
function startGame() {
  if (player1 && player2) {
    player1.emit('message', 'Game starts! Make your move (rock, paper, or scissors)');
    player2.emit('message', 'Game starts! Make your move (rock, paper, or scissors)');
  }
}

function determineWinner(move1, move2) {
  if (move1 === move2) {
    console.log('It is a tie!');
    return `It's a tie!`;
  }

  if (
    (move1 === 'rock' && move2 === 'scissors') ||
    (move1 === 'paper' && move2 === 'rock') ||
    (move1 === 'scissors' && move2 === 'paper')
  ) {
    console.log('Player 1 wins!');
    return 'Player 1 wins!';
  }
  console.log('Player 2 wins!');
  return 'Player 2 wins!';
}

function resetGame() {
  player1Move = null;
  player2Move = null;
}
