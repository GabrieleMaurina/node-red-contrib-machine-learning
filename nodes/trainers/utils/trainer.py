import json
import pickle
import pandas
import os
import sys

dir = os.path.split(os.path.abspath(__file__))[0]
try:
	file = dir + '\\train_' + sys.argv[1] + '.json'
	training = json.load(open(file, 'r'))
	os.remove(file)
except:
	print('Cannot load config file.', file=sys.stderr)
	exit(1)

try:
	df = pandas.DataFrame.from_records(training['dataset'])
	
	x = df.iloc[:, :-1]
	y = df.iloc[:, -1]
	
	classifier = None
	exec(open(dir + '\\classifiers\\' + training['config']['file']).read())
	classifier.fit(x, y)

	save = training['config']['save']
	dir = os.path.dirname(save)
	if not os.path.isdir(dir):
		os.makedirs(dir, exist_ok=True)
		
	pickle.dump(classifier, open(save, "wb"));
except:
	print('Cannot complete training.', file=sys.stderr)
	exit(1)

print('Training completed.')