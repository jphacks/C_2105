// 環境変数読み込み
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Serialport = require('serialport');

const sp = new Serialport(process.env.PORT_NAME, {
  baudRate: 115200,
});

sp.on('data', (data) => {
  try {
    console.log(data.toString());
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