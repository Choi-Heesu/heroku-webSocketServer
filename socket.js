var express = require('express');
var app = express();
const PORT = process.env.PORT;

var http = require('http').Server(app);
var io = require('socket.io')(http, {
  origin: '*'
});

io.on('connection', function (socket) {
  console.log('websocket connected');
  socket.on('blob', function (data) {
    io.emit('return', data);
    console.log(data);
  });

  socket.on('disconnect', function () {
    console.log("socket disconnected!");
  });
});

http.listen(PORT, function () {
  console.log('Heroku Server On');
});
