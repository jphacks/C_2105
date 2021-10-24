from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def root():
  return 'Hello World'

@app.route('/hoge')
def hoge():
  if request.args.get('fuga') is not None:
    return request.args.get('fuga')
  else:
    return 'fugaがNoneです'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)