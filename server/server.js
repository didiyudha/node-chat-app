const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname,'../public');

const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('onConnected', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newJoin', generateMessage('Admin', 'New user join'));

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (newMessage, callback) => {
    console.log('Create a message: ', newMessage);

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from server');
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });

  });
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});