var express = require('express');
var app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

const PORT = process.env.PORT;
const http = require('http');

setInterval(function () {
  http.get("https://recorder-websocket-server.herokuapp.com");
  console.log("Awake Server");
}, 600000);

var httpServer = http.Server(app);
var io = require('socket.io')(httpServer, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});

io.on('connection', function (socket) {
  console.log('Websocket connected');
  socket.on('blob', function (data) {
    io.emit('return', data);
    console.log(data);
  });

  socket.on('disconnect', function () {
    console.log("Websocket disconnected!");
  });
});

httpServer.listen(PORT, function () {
  console.log('Heroku Server On');
});
