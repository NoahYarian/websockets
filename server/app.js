'use strict';

var express = require('express');
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});

var io = socketio(server);

io.on('connection', function (socket) {
  console.log('Client connected: ', socket.id);

  socket.on('disconnect', function () {
    console.log('Client disconnected: ', socket.id);
  });

  socket.on('chatMessage', function (msg) {
    console.log('Message reveived: ', msg);

    // socket.emit('chatMessage', {toOne: msg});
    // socket.broadcast.emit('chatMessage', {toOthers: msg});
    io.emit('chatMessage', msg);
  });
});
