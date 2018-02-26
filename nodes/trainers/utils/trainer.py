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

	pickle.dump(classifier, open(training['config']['save'], "wb"));
except:
	print('Cannot complete training.', file=sys.stderr)
	exit(1)

print('Training completed.')