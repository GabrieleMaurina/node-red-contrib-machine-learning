import tensorflow as tf
import logging
import pickle
from shutil import rmtree
import os
import numpy as np

class DNNCTF:
    def __init__(self, path, layers = [10, 10, 10], learning_rate=0.01, steps=1000, batch_size=10, del_prev_mod=False, log=False):
        self.classifier = None
        self.last = 0
        if del_prev_mod:
            self.__del_prev_mod(path)
        if not self.__load(path):
            self.config = {
                "path": path,
                "layers": layers,
                "learning_rate": learning_rate,
                "steps": steps,
                "batch_size": batch_size,
            }
        if log:
            logging.getLogger().setLevel(logging.INFO)
        else:
            logging.getLogger().setLevel(logging.ERROR)

    def __del_prev_mod(self, path):
        if path:
            rmtree(path, ignore_errors=True)
            os.makedirs(path, exist_ok=True)

    def __load(self, path):
        try:
            self.config = pickle.load(open(path + '\\config.b', "rb"))
            self.__instantiate()
            return True
        except:
            return False

    def __input_func(self, x, y=None):
        features = {str(k):x[k] for k in x.keys()}
        if y:
            inputs = (features, y)
        else:
            inputs = features
        return tf.data.Dataset.from_tensor_slices(inputs).repeat().batch(self.config['batch_size'])

    def __instantiate(self):
        self.classifier = tf.estimator.DNNClassifier(
            feature_columns=self.config['fc'],
            hidden_units=self.config['layers'],
            n_classes=len(self.config['classes']),
            model_dir=self.config['path'],
            optimizer=tf.train.GradientDescentOptimizer(
                learning_rate=self.config['learning_rate']
            ))
        try:
            self.last = os.stat(self.config['path'] + '\\config.b').st_mtime
        except:
            self.last = 0

    def fit(self, x, y):
        if 'classes' not in self.config:
            self.config['classes'] = list(set(y))
        if 'fc' not in self.config:
            self.config['fc'] = [tf.feature_column.numeric_column(str(k)) for k in x.keys()]
        y = [self.config['classes'].index(i) for i in y]
        self.__instantiate()
        self.classifier.train(input_fn=lambda:self.__input_func(x, y), steps=self.config['steps'])
        self.__save()

    def predict(self, x):
        if self.classifier != None:
            if isinstance(x, list):
                x = np.array(x).T
                x = {i: x[i] for i in range(len(x))}
            predictions = self.classifier.predict(input_fn=lambda:self.__input_func(x))
            lenght = 0
            try:
                lenght = len(x.iterrows())
            except:
                lenght = len(x[0])
            return [self.config['classes'][p['class_ids'][0]] for i, p in zip(range(lenght), predictions)]

    def __save(self):
        pickle.dump(self.config, open(self.config['path'] + '\\config.b', "wb"))

    def update(self):
        modified = os.stat(self.config['path'] + '\\config.b').st_mtime
        if(modified > self.last):
            self.last = modified
            self.__load(self.config['path'])
