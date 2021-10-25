from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import db_init
import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/jphacks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

# プロジェクトテーブルの定義
class Project(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String)
  explanation = db.Column(db.String)
  progress = db.Column(db.Integer)
  imgUrl = db.Column(db.String)
  targetAmount = db.Column(db.Integer)
  # 外部キー
  log = db.relationship('Log')
  # 初期化
  def __init__(self, id=0, title='', explanation='', progress=0, imgUrl='', targetAmount=0):
    self.id = id
    self.title = title
    self.explanation = explanation
    self.progress = progress
    self.imgUrl = imgUrl
    self.targetAmount = targetAmount

# ログテーブルの定義
class Log(db.Model):
  logId = db.Column(db.Integer, primary_key=True)
  id = db.Column(db.Integer, db.ForeignKey('project.id'))
  date = db.Column(db.String)
  earnedValue = db.Column(db.Integer)
  donationType = db.Column(db.String)
  def __init__(self, logId=0, id=0, date='', earnedValue=0, donationType=''):
    self.logId = logId
    self.id = id
    self.date = date
    self.earnedValue = earnedValue
    self.donationType = donationType

# プロジェクトのオブジェクトを返す。※そのままだと扱いにくい型のため。
def project_record(p):
  return {'id': p.id, 'title': p.title, 'explanation': p.explanation, 'progress': p.progress, 'imgUrl': p.imgUrl, 'targetAmount': p.targetAmount}

# ログのオブジェクトを返す。
def log_record(l):
  return {'logId': l.logId, 'id': l.id, 'date': l.date, 'earnedValue': l.earnedValue, 'donationType': l.donationType}

@app.route('/project')
def project():
  id = request.args.get('id')
  if id is not None:
    # idに一致するプロジェクトのみを返す
    project = Project.query.get(id)
    return json.dumps(project_record(project))
  else:
    project = Project.query.all()
    result = []
    for p in project:
      result.append(project_record(p))
    return json.dumps(result)

@app.route('/log')
def log():
  id = request.args.get('id')
  if id is not None:
    log = Project.query.get(id).log
    result = []
    for l in log:
      result.append(log_record(l))
    return json.dumps(result)
  else:
    return 'パラメータが正しくありません。'

if __name__ == '__main__':

  # 初期化
  db.drop_all()
  # db生成
  db.create_all()

  # ダミーデータを保存
  db_init.initialize()

  app.run(host='0.0.0.0', port=8080)