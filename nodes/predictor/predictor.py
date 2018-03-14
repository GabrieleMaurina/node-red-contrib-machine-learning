import pickle
import sys
import json

config = json.loads(input())
model = pickle.load(open(config['path'], "rb"))

while True:
	features = json.loads(input())
	print(json.dumps(model.predict(features).tolist()))
