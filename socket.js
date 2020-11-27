var express = require('express');
var app = express();
const PORT = process.env.PORT;
const http = require('http');

setInterval(function () {
  http.get("https://recorder-websocket-server.herokuapp.com");
}, 600000);

var httpServer = http.Server(app);
var io = require('socket.io')(httpServer, {
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

httpServer.listen(PORT, function () {
  console.log('Heroku Server On');
});
