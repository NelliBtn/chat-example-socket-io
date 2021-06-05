// initializes app to be a function handler that you can supply to an HTTP server (line 4)
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// run "npm install socket.io", it added dependencies to pckg.json, add it to index now
// initialize a new instance of socket.io by passing the SERVER (http server) object
const { Server } = require("socket.io");
const io = new Server(server);

// define a route handler / that gets called when we hit our website home
// how does "__dirname + " work?
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// listen on 'connection' event for incoming sockets and log it into console
io.on('connection', (socket) => {
  // connection event fires and logs in terminal when open or refresh the page in browser
  console.log('a user connected');

  // print out 'chat message' event
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // 'emit' msg to everyone
    io.emit('chat message', msg);
    // or 'broadcast' msg to everyone EXCEPT for the certain emitting  socket
    // socket.broadcast.emit('hi');
  });
  // disconnection event fires when user closes the page in browser
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// make the http server listen on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});