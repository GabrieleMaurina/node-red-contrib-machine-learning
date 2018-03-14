import sklearn.metrics as m
import json
import sys
import numpy
from inspect import getargspec

config = json.loads(input())

while True:
	data = json.loads(input())
	get_score = getattr(m, config['score'])
	kwargs = {}
	if 'average' in getargspec(get_score).args:
		kwargs['average'] = 'micro'
	if 'beta' in getargspec(get_score).args:
		kwargs['beta'] = 1
	score = get_score(data['real'], data['predicted'], **kwargs)
	if type(score) is numpy.ndarray:
		score = json.dumps(score.tolist())
	print(score)
