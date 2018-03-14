import pickle
import json
import os

config = json.loads(input())

last = os.stat(config['path']).st_mtime
model = pickle.load(open(config['path'], "rb"))

while True:
	features = json.loads(input())
	modified = os.stat(config['path']).st_mtime
	if(modified > last):
		last = modified
		model = pickle.load(open(config['path'], "rb"))
	print(json.dumps(model.predict(features).tolist()))
