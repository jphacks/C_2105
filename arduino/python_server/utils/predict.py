import torch

def to_tensor(inputs, transformer):
  res = torch.stack([transformer(i) for i in inputs], dim=0)
  res.to('cpu')
  return res

def predict(model, inputs, classes, transformer):
  inputs = to_tensor(inputs, transformer)
  print(inputs.shape)
  outputs = model(inputs)
  preds = outputs.argmax(dim=1, keepdim=True)
  res = { x: 0 for x in classes}
  for i in range(len(preds)):
    pred_class = classes[preds[i].item()]
    res[pred_class] += 1
  return res
