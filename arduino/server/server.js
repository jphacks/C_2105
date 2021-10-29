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

  // 初期設定（端末識別）
  // 本来はデバイスごとに切り替え
  // ラズパイとかで動かす想定ならlocalhostでやればいいから問題なし
  socket.join('test');

  socket.on('donated', (donatedMoney) => {
    console.log('donated!')
    console.log(donatedMoney)
    socket.to('test').emit('donated', donatedMoney);
  });

  socket.on('fin', () => {
    socket.to('fin').emit('donated', 'finish');
  })
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});