import json
import pandas
import os
import sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '/../../utils')
from sklw import SKLW
from dnnctf import DNNCTF

config = json.loads(input())

def load():
	try:
		return SKLW(path=config['path'])
	except:
		try:
			return DNNCTF(path=config['path'], load=True)
		except:
			return None

model = load()

while True:
	features = pandas.read_json(input(), orient='values')
	if model is None:
		model = load()
	if model is None:
		raise('Cannot find model.')
	model.update()
	print(json.dumps(model.predict(features)))
