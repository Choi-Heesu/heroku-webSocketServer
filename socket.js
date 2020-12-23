const express = require('express');
//const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const http = require('http');

/*app.use(function (req, res, next) {
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
});*/

//app.use(cors());

/*setInterval(function () {
  http.get("https://recorder-websocket-server.herokuapp.com");
  console.log("Awake Server");
}, 600000);*/

var httpServer = http.Server(app);
var io = require('socket.io')(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', function (socket) {
  console.log('Websocket connected');
  
  socket.on('hello', function (data) {
    io.emit('hello', data);
  });

  socket.on('blob', function (data) {
    io.emit('return', data);
    console.log(data);
  });

  socket.on('disconnect', function () {
    console.log("Websocket disconnected!");
  });
});

io.on('error',function(e){
	console.log('socket.io error:'+e);
});

httpServer.listen(PORT, function () {
  console.log('Heroku Server On');
});
