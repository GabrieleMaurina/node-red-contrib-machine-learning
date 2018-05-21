import json
import pandas
import os

#read configurations
config = json.loads(input())

while True:
	#wait request
	input()

	df = pandas.read_csv(config['path'], header=None)

	r, c = df.shape

	if config['shuffle']:
		df = df.sample(frac=1, random_state=config['seed'])

	x_train = df.iloc[: int(r * config['trainingPartition']), config['input']]
	x_test = df.iloc[int(r * config['trainingPartition']) :, config['input']]

	if 'output' in config:
		y_train = df.iloc[: int(r * config['trainingPartition']), config['output']]
		y_test = df.iloc[int(r * config['trainingPartition']) :, config['output']]

		x_train[x_train.shape[1]] = y_train
		x_test[x_test.shape[1]] = y_test

	if not os.path.isdir(config['save']):
		os.makedirs(config['save'], exist_ok=True)

	x_train.to_csv(config['save'] + '/train.csv', header=None, index=False)
	x_test.to_csv(config['save'] + '/test.csv', header=None, index=False)

	print('Dataset created.')
