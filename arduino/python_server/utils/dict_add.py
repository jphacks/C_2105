def dict_add(a, b):
  keys = a.keys()
  res = {}
  for key in keys:
    res[key] = a.get(key, 0) + b.get(key, 0)
  return res