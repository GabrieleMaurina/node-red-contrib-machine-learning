import json
import pickle
import pandas
import os
import sys

dir = os.path.split(os.path.abspath(__file__))[0]
try:
	config = dir + '\\config_' + sys.argv[1] + '.json'
	dataset = json.load(open(config, 'r'))
	os.remove(config)
except:
	print('Cannot load config file.', end='')
	quit()

try:
	df = pandas.read_csv(dataset['path'], header=None)
except:
	print('Cannot load dataset file.', end='')
	quit()

try:
	r, c = df.shape

	x = df.iloc[: r * dataset['amount'], dataset['input']]
	y = df.iloc[: r * dataset['amount'], dataset['output']]
	
	classifier = None
	exec(open(dir + '\\classifiers\\' + dataset['classifier']).read())
	classifier.fit(x, y)

	pickle.dump(classifier, open(dataset['save'], "wb"));
except:
	print('Cannot complete training.', end='')
	quit()

print('Training completed.', end='')