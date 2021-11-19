// 環境変数読み込み
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Serialport = require('serialport');
const client = require('socket.io-client');

const socket = client.connect(process.env.WS_HOST, {reconnect: true});

socket.on('connect', () => {
  console.log('connect success!')
});


const sp = new Serialport(process.env.PORT_NAME, {
  baudRate: 19200,
});

let dataStack = "";
sp.on('data', (data) => {
  try {
    const v = data.toString();
    let flg = false;
    [].forEach.call(v, (c) => {
      dataStack += c;
      if(dataStack == "in"){
        console.log('coin in');
        socket.emit('coin in');
        dataStack = "";
      }
    });
  } catch(e) {
    console.log(e);
    return;
  }
});

sp.on('close', function(err) {
  console.log('port closed');
});

sp.on('open', function(err) {
  console.log('port opened');
});

module.exports = sp;