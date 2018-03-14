import json
import pickle
import pandas
import os

config = json.loads(input())

while True:
	df = pandas.read_json(input(), orient='values')

	x = df.iloc[:, :-1]
	y = df.iloc[:, -1]

	classifier = None

	if config['classifier'] == 'decision-tree-classifier':
		from sklearn.tree import DecisionTreeClassifier
		classifier = DecisionTreeClassifier(**config['kwargs'])
	elif config['classifier'] == 'k-neighbors-classifier':
		from sklearn.neighbors import KNeighborsClassifier
		classifier = KNeighborsClassifier(**config['kwargs'])
	elif config['classifier'] == 'multi-layer-perceptron-classifier':
		from sklearn.neural_network import MLPClassifier
		classifier = MLPClassifier(**config['kwargs'])
	elif config['classifier'] == 'random-forest-classifier':
		from sklearn.ensemble import RandomForestClassifier
		classifier = RandomForestClassifier(**config['kwargs'])
	elif config['classifier'] == 'support-vector-classifier':
		from sklearn.svm import SVC
		classifier = SVC(**config['kwargs'])

	classifier.fit(x, y)

	save = config['save']
	dir = os.path.dirname(save)
	if not os.path.isdir(dir):
		os.makedirs(dir, exist_ok=True)

	pickle.dump(classifier, open(save, "wb"));

	print('Training completed.')
