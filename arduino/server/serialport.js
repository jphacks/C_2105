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

const coins = {
  '1': {
    weight: 1.,
  },
  '50': {
    weight: 4.
  },
  '5': {
    weight: 3.75
  },
  '100': {
    weight: 4.8
  },
  '10': {
    weight: 4.5
  },
  '500': {
    weight: 7.
  }
};

let timer;
let timerFlg = false;

let dataStack = "";
sp.on('data', (data) => {
  try {
    if(timerFlg){
      clearTimeout(timer);
      timerFlg = false;
    }
    const v = data.toString();
    let flg = false;
    console.log(v);
    [].forEach.call(v, (c) => {
      if(c != "e") dataStack += c;
      else flg = true;
    });
    if(!flg) return;
    const value = parseFloat(dataStack) + 0.2; // 全体的に0.1gくらい軽めに数値が出ている印象
    dataStack = "";
    let dif = 1e8;
    let res = {};
    Object.keys(coins).forEach((key) => {
      let d = Math.abs(value - coins[key].weight);
      if(d < dif){
        res = {};
        res[key] = 1;
        dif = d;
      }
    });
    socket.emit('donated', res);
    timer = setTimeout(() => {
      socket.emit('fin');
      timerFlg = false;
    }, 3000);
    timerFlg = true;
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