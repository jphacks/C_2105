from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# import db_init
import db_seed
import json
import datetime
import uuid
import random

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
  column = db.relationship('Column')
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

# コラムテーブルの定義
class Column(db.Model):
  columnId = db.Column(db.Integer, primary_key=True)
  id = db.Column(db.Integer, db.ForeignKey('project.id'))
  columnTitle = db.Column(db.String)
  body = db.Column(db.String)
  date = db.Column(db.String)
  imgUrl = db.Column(db.String)
  def __init__(self, columnId=0, id=0, columnTitle='', body='', date='', imgUrl=''):
    self.columnId = columnId
    self.id = id
    self.columnTitle = columnTitle
    self.body = body
    self.date = date
    self.imgUrl = imgUrl

# プロジェクトのオブジェクトを返す。※そのままだと扱いにくい型のため。
def project_record(p):
  return {'id': p.id, 'title': p.title, 'explanation': p.explanation, 'progress': p.progress, 'imgUrl': p.imgUrl, 'targetAmount': p.targetAmount}

# ログのオブジェクトを返す。
def log_record(l):
  return {'logId': l.logId, 'id': l.id, 'date': l.date, 'earnedValue': l.earnedValue, 'donationType': l.donationType}

# コラムのオブジェクトを返す。
def column_record(c):
  return {'columnId': c.columnId, 'id': c.id, 'columnTitle': c.columnTitle, 'body': c.body, 'date': c.date, 'imgUrl': c.imgUrl}

# プロジェクトのリストを返す。
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

# ログのリストを返す。
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

# コラムのリストを返す。
@app.route('/column')
def column():
  id = request.args.get('id')
  if id is not None:
    column = Project.query.get(id).column
    result = []
    for c in column:
      result.append(column_record(c))
    return json.dumps(result)
  else:
    return 'パラメータが正しくありません。'

# 募金をする。
@app.route('/collect')
def collect():
  logId = int(str(uuid.uuid4().int)[:5])
  id = request.args.get('id')
  dt_now = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
  earnedValue = request.args.get('earnedValue')

  if id is not None:
    # idに一致するプロジェクトに募金
    donationType = 'selected'
  else:
    # ランダムに募金
    donationType = 'auto'
    project_all = Project.query.all()
    id_array = []
    for p in project_all:
      id_array.append(p.id)
    target_index = random.randint(0, len(id_array) - 1)
    id = id_array[target_index]

  # ログを記録する。
  log = Log(logId, id, dt_now, earnedValue, donationType)
  db.session.add(log)

  # プロジェクトのprogressを更新する。
  project = Project.query.get(id)
  project.progress += int(earnedValue)

  # dbを更新
  db.session.commit()

  return json.dumps(project_record(project))

# プロジェクトを作成する。
@app.route('/create_project')
def create_project():
  id = request.args.get('id')
  title = request.args.get('title')
  explanation = request.args.get('explanation')
  progress = request.args.get('progress')
  imgUrl = request.args.get('imgUrl')
  targetAmount = request.args.get('targetAmount')

  p = Project(id, title, explanation, progress, imgUrl, targetAmount)
  db.session.add(p)
  db.session.commit()

  return json.dumps(project_record(p))

# コラムを作成する。
@app.route('/create_column')
def create_column():
  columnId = int(str(uuid.uuid4().int)[:5])
  id = request.args.get('id')
  columnTitle = request.args.get('columnTitle')
  body = request.args.get('body')
  dt_now = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
  imgUrl = request.args.get('imgUrl')

  c = Column(columnId, id, columnTitle, body, dt_now, imgUrl)
  db.session.add(c)
  db.session.commit()

  return json.dumps(column_record(c))

if __name__ == '__main__':
  # 初期化
  db.drop_all()
  # db生成
  db.create_all()
  # ダミーデータを保存 ※本番では削除して、APIからプロジェクトなどを作成する。
  # db_init.initialize()
  db_seed.seed()
  app.run(host='0.0.0.0', port=8080)
