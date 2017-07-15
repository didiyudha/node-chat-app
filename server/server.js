const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// Tell the express middleware to use static assets
// and where the location of relative path is
app.use(express.static(publicPath));

// Waiting for the user connected to the server
io.on('connection', (socket) => {
  console.log('New user connected');

  // Initial message from server to the user when connected
  // send message to a specific user
  //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // Server broadcast message to the user 
  // and tell the user that there's new user connected
  // except the current user
  //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
  // Server receive a message from user
  // server send message back to all users that connected 
  socket.on('createMessage', (message, callback) => {
    var usr = users.getUser(socket.id);
    if (usr && isRealString(message.text)) {
      // io.emit will send message to the all users that are connected
      io.to(usr.room).emit('newMessage', generateMessage(usr.name, message.text));
    }
    // acknowledgement from server
      callback();
  });

  // Server receive message location from user
  socket.on('createLocationMessage', (coords) => {
    var usr = users.getUser(socket.id);
    if (usr) {
      // Server send back the location message to the user
      io
        .to(usr.room)
        .emit('newLocationMessage', 
              generateLocationMessage(usr.name, coords.latitude, coords.longitude)
        );
    }
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room is required');
    }
    // socket.leave('room name') -> to leave a room
    // io.emit -> io.to('room name').emit
    // socket.boradcast.emit -> socket.broadcast.to('room name').emit
    // socket.emit
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // Send updated user list to all connected users because of someone new has joined the room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  // Detect if there's a user disconnected to server and logged it
  socket.on('disconnect', () => {
    console.log('User was disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left chat`));
      console.log(`${user.name} left chat`);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
