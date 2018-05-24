import json
import pickle
import pandas
import os
import sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '/../../utils')
from sklw import SKLW

OUTLIER_DETECTORS = ['elliptic-envelope-classifier', 'isolation-forest-classifier', 'one-class-support-vector-classifier']

#read configurations
config = json.loads(input())
save = config['save']

while True:
	#read request
	data = input()
	try:
		#load data from request
		df = pandas.read_json(data, orient='values')
	except:
		#lead file specified in the request
		df = pandas.read_csv(json.loads(data)['file'], header=None)

	if config['classifier'] in OUTLIER_DETECTORS:
		x = df
		y = None
	else:
		x = df.iloc[:, :-1]
		y = df.iloc[:, -1]

	classifier = None

	if config['classifier'] == 'decision-tree-classifier':
		from sklearn.tree import DecisionTreeClassifier
		classifier = SKLW(path=save, model=DecisionTreeClassifier(**config['kwargs']))
	elif config['classifier'] == 'deep-neural-network-classifier-tensorflow':
		from dnnctf import DNNCTF
		classifier = DNNCTF(path=save, del_prev_mod=True, **config['kwargs'])
	if config['classifier'] == 'elliptic-envelope-classifier':
		from sklearn.covariance import EllipticEnvelope
		classifier = SKLW(path=save, model=EllipticEnvelope(**config['kwargs']))
	if config['classifier'] == 'isolation-forest-classifier':
		from sklearn.ensemble import IsolationForest
		classifier = SKLW(path=save, model=IsolationForest(**config['kwargs']))
	elif config['classifier'] == 'k-neighbors-classifier':
		from sklearn.neighbors import KNeighborsClassifier
		classifier = SKLW(path=save, model=KNeighborsClassifier(**config['kwargs']))
	elif config['classifier'] == 'multi-layer-perceptron-classifier':
		from sklearn.neural_network import MLPClassifier
		classifier = SKLW(path=save, model=MLPClassifier(**config['kwargs']))
	if config['classifier'] == 'one-class-support-vector-classifier':
		from sklearn.svm import OneClassSVM
		classifier = SKLW(path=save, model=OneClassSVM(**config['kwargs']))
	elif config['classifier'] == 'random-forest-classifier':
		from sklearn.ensemble import RandomForestClassifier
		classifier = SKLW(path=save, model=RandomForestClassifier(**config['kwargs']))
	elif config['classifier'] == 'support-vector-classifier':
		from sklearn.svm import SVC
		classifier = SKLW(path=save, model=SVC(**config['kwargs']))

	try:
		#train model
		classifier.fit(x, y)
	except Exception as e:
		print(e)
		raise()

	print(config['classifier'] + ': training completed.')
