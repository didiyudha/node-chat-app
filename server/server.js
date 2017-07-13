const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Tell the express middleware to use static assets
// and where the location of relative path is
app.use(express.static(publicPath));

// Waiting for the client connected to the server
io.on('connection', (socket) => {
  console.log('New user connected');

  // Initial message from server to the client when connected
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // Server broadcast message to the client 
  // and tell the client that there's new client connected
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
  // Server receive a message from client
  // server send message back to all clients that connected
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // io.emit will send message to the clients that connected
    io.emit('newMessage', generateMessage(message.from, message.text));
    // acknowledgement from server
    callback('This is from server');
  });

  // Detect if there's a client disconnected to server and logged it
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
