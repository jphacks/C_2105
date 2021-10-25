from app import db, Project, Log

def initialize():
  p = Project(101, 'プロジェクト1', 'プロジェクト1の説明です。', 0, 'hoge.jpg', 100)
  db.session.add(p)
  p = Project(102, 'プロジェクト2', 'プロジェクト2の説明です。', 0, 'hoge.jpg', 100)
  db.session.add(p)
  p = Project(103, 'プロジェクト3', 'プロジェクト3の説明です。', 0, 'hoge.jpg', 100)
  db.session.add(p)

  l = Log(501, 101, '202110250930', 20, 'selected')
  db.session.add(l)
  l = Log(502, 101, '202110250931', 30, 'selected')
  db.session.add(l)
  l = Log(503, 102, '202110250932', 40, 'auto')
  db.session.add(l)

  db.session.commit()