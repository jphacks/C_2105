var express = require('express');
var app = express();

var http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log('connected!');
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});