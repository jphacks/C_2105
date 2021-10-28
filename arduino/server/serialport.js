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

sp.on('data', (data) => {
  try {
    const value = parseFloat(data.toString());
    if(value == NaN){
      return;
    }
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