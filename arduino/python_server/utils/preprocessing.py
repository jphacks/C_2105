import cv2
import numpy as np
import copy

def preprocessing(img):
  return crop_img(img)


def crop_img(img, minDist=30, param1=100, param2=30, minRadius=30, maxRadius=70):
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
    return np.array([])
  res = []
  circles = np.uint16(np.around(circles))
  for circle in circles[0, :]:
    x, y, r = circle
    cropped_img = copy.deepcopy(img[max(int(x) - int(r), 0):min(img.shape[0], x + r), max(int(y) - int(r), 0):min(img.shape[1], y + r), :])
    if len(cropped_img) > 0:
      res.append(cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB))
  return np.array(res, dtype=object)