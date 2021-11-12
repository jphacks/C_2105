# 必要なモジュールの読み込み
from flask import Flask
from flask_socketio import SocketIO, emit, join_room
import torch
import torch.nn as nn
from torchvision import models, transforms
import os

# CNNの準備
data_transformer = transforms.Compose([
  transforms.ToPILImage(),
  transforms.RandomResizedCrop(256),
  transforms.ToTensor(),
  transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

classes = ['0', '1', '10', '100', '5', '50', '500']

model = models.resnet50(pretrained=False)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 7)
model.to('cpu')

weight_path = ''

if os.path.exists(weight_path):
  model.load_state_dict(torch.load(weight_path))

model.eval()

# 非同期処理に使用するライブラリの指定
# `threading`, `eventlet`, `gevent`から選択可能
async_mode = None

# Flaskオブジェクトを生成し、セッション情報暗号化のキーを指定
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

# Flaskオブジェクト、async_modeを指定して、SocketIOサーバオブジェクトを生成
socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")

# スレッドを格納するためのグローバル変数
thread = None

@socketio.on('connect')
def connect():
  print('connected')
  join_room('test')

@socketio.on('donated')
def donated(donatedMoney):
  print('donated')
  print(donatedMoney)
  emit('donated', donatedMoney, broadcast=True)

@socketio.on('fin')
def donation_finished():
  print('donation finished')
  emit('fin', 'fin', broadcast=True)



if __name__ == '__main__':
  socketio.run(app, host='0.0.0.0', port=3001)