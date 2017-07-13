var socket = io();

// Client connected to the server
socket.on('connect', function () {
  console.log('Connected to server');
});

// Client disconnected to the server
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// Client receive message from server
// client print the message and binding it int <ul> component
socket.on('newMessage', function (message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}-${message.text}`);
  jQuery('#messages').append(li);
});

// Handle input from user form
// grab the message and send it to the server
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var text = jQuery('[name=message]').val();
  jQuery('[name=message]').val('');
  socket.emit('createMessage', {
    from: 'User',
    text: text
  }, function() {

  });
});