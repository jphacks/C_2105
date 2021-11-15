# 必要なモジュールの読み込み
from flask import Flask
from flask_socketio import SocketIO, emit, join_room
import torch
import torch.nn as nn
from torchvision import models, transforms
import os
import cv2
import numpy as np
from collections import deque
from utils.predict import predict
from utils.dict_add import dict_add
from utils.preprocessing import preprocessing
from io import BytesIO
import base64

# CNNの準備
data_transformer = transforms.Compose([
  transforms.ToPILImage(),
  transforms.RandomResizedCrop(256),
  transforms.CenterCrop(224),
  transforms.ToTensor(),
  transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

classes = ['0', '1', '10', '100', '5', '50', '500']

model = models.resnet18(pretrained=False)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 7)
model.to('cpu')

weight_path = 'iPad_image_cpu_resnet18.pth'

if os.path.exists(weight_path):
  print('Load a pretrained model')
  model.load_state_dict(torch.load(weight_path))

model.eval()

## 画像データ格納用
images = deque()
CACHED_IMG_NUM = 30

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

@socketio.on('image')
def stream(img):
  print('image recieved')
  img = base64.b64decode(img['image'].split(',')[1])
  img = np.frombuffer(img, np.uint8)

  if img is not None:
    images.append(cv2.imdecode(img, flags=cv2.IMREAD_COLOR))
  
  if len(images) > CACHED_IMG_NUM:
    images.popleft()

@socketio.on('coin in')
def coin_in():
  print('prediction start')
  res = { x: 0 for x in classes }
  for img in images:
    img = preprocessing(img)
    if len(img) == 0:
      continue
    res = dict_add(res, predict(model, img, classes=classes, transformer=data_transformer))
  
  coin = '0'
  pred_val = 0
  for key, val in res.items():
    if key == coin:
      continue
    if pred_val < val:
      coin = key
      pred_val = val

  if coin != '0':
    print('a coin {:s} was donated'.format(coin))
    emit('donated', { coin: 1 }, broadcast=True)
  else:
    print('coin is not detected')

if __name__ == '__main__':
  socketio.run(app, host='0.0.0.0', port=3001)