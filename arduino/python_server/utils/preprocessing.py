import cv2
import numpy as np
import copy

# 画像のトリミングとかできるならここでやる
def preprocessing(img, top=0, bottom=-1, left=0, right=-1):
  h, w, c = img.shape
  if bottom == -1:
    bottom = h
  if right == -1:
    right = w
  # 投入部分をトリミングする方針に変更
  # return crop_img(img)
  return [img[top:bottom, left:right, :]]


def crop_img(img, minDist=30, param1=100, param2=40, minRadius=30, maxRadius=70):
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  gray = cv2.medianBlur(gray, 7)
  circles = cv2.HoughCircles(
    gray,
    cv2.HOUGH_GRADIENT,
    dp=1,
    minDist=minDist,
    param1=param1,
    param2=param2,
    minRadius=minRadius,
    maxRadius=maxRadius
  )
  if circles is None:
    return []
  res = []
  circles = np.uint16(np.around(circles))
  for circle in circles[0, :]:
    x, y, r = circle
    cropped_img = copy.deepcopy(img[max(int(x) - int(r), 0):min(img.shape[0], x + r), max(int(y) - int(r), 0):min(img.shape[1], y + r), :])
    if len(cropped_img) > 0:
      res.append(cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB))
  return res