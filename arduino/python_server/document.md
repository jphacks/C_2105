# WebSocket Server(Python)

機械学習で硬貨識別をするためにWebsocket ServerをPythonで再構築  
コンテナだとメモリの関係でpytorchが乗らないのでローカル推奨

## 環境構築

- Python 3.8.6(version 3.6以上なら動くはずだが、動作確認しているのは3.8.6のみ)

```shellscript
# パッケージインストール
pip install -r requirements.txt
# サーバー起動
python app.py
```