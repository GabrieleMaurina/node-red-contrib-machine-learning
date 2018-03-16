import json
import pandas
import os
import sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '\\..\\..\\utils')
from sklw import SKLW
from dnnctf import DNNCTF

config = json.loads(input())

try:
	model = SKLW(path=config['path'])
except:
	model = DNNCTF(path=config['path'])

while True:
	features = pandas.read_json(input(), orient='values')
	model.update()
	print(json.dumps(model.predict(features)))
