const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');

const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'server',
    to: 'client',
    createdAt: new Date().getTime()
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (newMessage) => {
    console.log('Create a message: ', newMessage);
  });
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});