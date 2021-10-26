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
  baudRate: 115200,
});

const coinsSortedBySize = ['1', '50', '5', '100', '10', '500'];

let counter = new Array(7).fill(0);

sp.on('data', (data) => {
  try {
    const value = data.toString();
    if(value == 'end'){
      // 一旦投入に区切りがついた
      const donatedMoney = {};
      for(let i = 0; i < 6; i++){
        donatedMoney[coinsSortedBySize[i]] = counter[i] - counter[i + 1];
      }
      // イベント名は変えるかも
      socket.emit('donated', donatedMoney);
      counter = new Array(7).fill(0);
    }else{
      counter[value]++;
    }
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