import json
import sklearn.metrics as m
import os
import sys
import json

try:
	dir = os.path.split(os.path.abspath(__file__))[0]
	file = dir + '\\assessment_' + sys.argv[1] + '.json'
	data = json.load(open(file, 'r'))
	os.remove(file)
except:
	print('Cannot load data file.', file=sys.stderr)
	exit(1)

res = 0
try:
	if sys.argv[2] == 'Accuracy':
		res = m.accuracy_score(data['real'], data['predicted'])
	elif sys.argv[2] == 'Precision':
		res = m.precision_score(data['real'], data['predicted'], average='micro')
	elif sys.argv[2] == 'F1 Score':
		res = m.f1_score(data['real'], data['predicted'], average='micro')
	else:
		raise Exception('Bad request.')
except:
	print('Error while processing data.', file=sys.stderr)
	exit(1)
	
print(res)