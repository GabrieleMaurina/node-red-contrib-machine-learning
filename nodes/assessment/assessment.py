import sklearn.metrics as m
import json
import sys

config = json.loads(input())

while True:
	data = json.loads(input())

	if config['score'] == 'accuracy':
		print(m.accuracy_score(data['real'], data['predicted']))
	elif config['score'] == 'precision':
		print(m.precision_score(data['real'], data['predicted'], average='micro'))
	elif config['score'] == 'f1 Score':
		print(m.f1_score(data['real'], data['predicted'], average='micro'))
	else:
		print('Wrong metrics type.', file=sys.stderr)
