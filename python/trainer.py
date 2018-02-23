import json
import pickle
import pandas
import os
import sys

dir = os.path.split(os.path.abspath(__file__))[0]
try:
	conf = dir + '\\config_' + sys.argv[1] + '.json'
	config = json.load(open(conf, 'r'))
	os.remove(conf)
except:
	print('Cannot load config file.', end='')
	quit()

try:
	df = pandas.read_csv(config['dataset']['path'], header=None)
except:
	print('Cannot load dataset file.', end='')
	quit()

try:
	r, c = df.shape

	x = df.iloc[: r * config['dataset']['amount'], config['dataset']['input']]
	y = df.iloc[: r * config['dataset']['amount'], config['dataset']['output']]
	
	classifier = None
	exec(open(dir + '\\classifiers\\' + config['classifier']['file']).read())
	classifier.fit(x, y)

	pickle.dump(classifier, open(config['save'], "wb"));
except:
	print('Cannot complete training.', end='')
	quit()

print('Training completed.', end='')