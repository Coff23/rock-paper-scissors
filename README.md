# Rock, Paper, Scissors Game - Event-Driven Application

This is a real-time Rock, Paper, Scissors game application built using an event-driven architecture. The application consists of a hub server and two clients that connect to the hub server to play the game. The hub server moderates the game events, such as moves and determining the winner.

## User Stories

- As a player, I want to be able to connect to the game server as either Player 1 or Player 2, so that I can participate in the Rock, Paper, Scissors game.

- As a player, I want to be able to choose my move (rock, paper, or scissors) and submit it to the server, so that I can play the game.

- As a player, I want to receive the game results (winner or tie) after both players have made their moves, so that I know the outcome of each round.
Problem Domain

## The problem domain of this application is a real-time multiplayer game of Rock, Paper, Scissors. The challenge is to build a hub server that can handle multiple clients, assign them as players, receive and process their moves, determine the winner, and communicate the game results back to the players

### Technology Used

- The Rock, Paper, Scissors game application is built using the following technologies:

  - Node.js: The hub server and client applications are developed using Node.js, a JavaScript runtime.

  - WebSocket: The WebSocket protocol is used for real-time bidirectional communication between the hub server and clients. The websocket library is used to implement WebSocket functionality.

  - HTTP: An HTTP server is created to handle initial client connections and WebSocket upgrades.

  - JavaScript: The application logic is implemented using JavaScript, providing a flexible and event-driven programming language.
