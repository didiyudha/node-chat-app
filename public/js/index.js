var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('onConnected', function(msg) {
  console.log('onConnected: ', msg);
});

socket.on('newJoin', function(msg) {
  console.log('newJoin: ', msg);
});

socket.on('disconnect', function() {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
  console.log('New message: ', message);
});

socket.emit('createMessage', {
  from: 'Julia',
  text: 'Hi All'
}, function(data) {
  console.log('Got it.', data);
});