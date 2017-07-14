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

socket.on('newLocationMessage', function(locationMessage) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${locationMessage.from}: `);
  a.attr('href', locationMessage.url);
  li.append(a);
  jQuery('#messages').append(li);
});

// Handle input from user form
// grab the message and send it to the server
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    // Send position (latitude, longitude) of user to the server
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch the location');
  });
});