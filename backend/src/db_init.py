from app import db, Project, Log

def initialize():
  p = Project(101, 'プロジェクト1', 'プロジェクト1の説明です。', 50, 'hoge.jpg', 100)
  db.session.add(p)
  p = Project(102, 'プロジェクト2', 'プロジェクト2の説明です。', 40, 'hoge.jpg', 100)
  db.session.add(p)
  p = Project(103, 'プロジェクト3', 'プロジェクト3の説明です。', 0, 'hoge.jpg', 100)
  db.session.add(p)

  l = Log(50001, 101, '20211025093055', 20, 'selected')
  db.session.add(l)
  l = Log(50002, 101, '20211025093155', 30, 'selected')
  db.session.add(l)
  l = Log(50003, 102, '20211025093255', 40, 'auto')
  db.session.add(l)

  db.session.commit()