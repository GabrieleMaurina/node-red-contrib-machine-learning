# node-red-contrib-machine-learning
This module for Node-RED contains a set of nodes which offer machine learning functionalities.
Such nodes have a python core that takes advantage of common ML libraries such as SciKit-Learn and Tensorflow.
Classification and outlier detection can be performed through the use of this package.

## Pre requisites
Install the following python libraries
* Python 3.6.4 or higher
* Numpy
* Pandas
* SciKit-Learn
* Tensorflow (optional)

## Install
To install the latest version use the Menu - Manage palette option and search for node-red-contrib-machine-learning, or run the following command in your Node-RED user directory (typically ~/.node-red):

    npm i node-red-contrib-machine-learning

## Usage
This flows show how to create a datasets, train models and then evaluate them. Models, after training, can be use in real scenarios to make predictions.

Classification
![classification](https://i.imgur.com/GGBSYH3.png "Training, classification and evaluation")
Outlier detection
![outlier detection](https://i.imgur.com/pyj0ROd.png "Training, outlier detection and evaluation")

Example flows available here:
```json
[
    {
        "id": "b91d4434.7851b8",
        "type": "create dataset",
        "z": "21ce826.2ff977e",
        "name": "",
        "path": "test/iris.data",
        "saveFolder": "test/datasets",
        "saveName": "iris",
        "input": "0,1,2,3",
        "output": "4",
        "trainingPartition": "",
        "shuffle": true,
        "seed": "",
        "x": 340,
        "y": 40,
        "wires": [
            [
                "3e5094c8.88bf9c"
            ]
        ]
    },
    {
        "id": "59363047.dc2da",
        "type": "load dataset",
        "z": "21ce826.2ff977e",
        "name": "",
        "datasetFolder": "test/datasets",
        "datasetName": "iris",
        "partition": "train.csv",
        "input": true,
        "output": true,
        "x": 290,
        "y": 200,
        "wires": [
            [
                "e41f5b9.cb8a4a8",
                "f0dd65dd.bd7698",
                "55cfde32.811c5",
                "e12eaf38.e871b",
                "db825395.34fbf",
                "d0b283ca.68ff"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "ae3e4a60.60e878",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "Start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 40,
        "wires": [
            [
                "b91d4434.7851b8"
            ]
        ]
    },
    {
        "id": "dc773b02.966158",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "Start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 200,
        "wires": [
            [
                "59363047.dc2da"
            ]
        ]
    },
    {
        "id": "af4918fd.76bfc8",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "Start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 460,
        "wires": [
            [
                "a6686ef9.88fa9",
                "89ba836a.6f936"
            ]
        ]
    },
    {
        "id": "3e5094c8.88bf9c",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "print",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 570,
        "y": 40,
        "wires": []
    },
    {
        "id": "f55efac2.3d0498",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "error",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 770,
        "y": 240,
        "wires": []
    },
    {
        "id": "98372bbc.d92818",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "print",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 770,
        "y": 160,
        "wires": []
    },
    {
        "id": "7b15556d.2c6a3c",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "dtc",
        "modelPath": "test/models",
        "modelName": "dtc.b",
        "x": 450,
        "y": 400,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "e41f5b9.cb8a4a8",
        "type": "decision tree classifier",
        "z": "21ce826.2ff977e",
        "name": "",
        "savePath": "test/models",
        "saveName": "dtc.b",
        "maxDepth": "",
        "criterion": "gini",
        "splitter": "best",
        "x": 520,
        "y": 100,
        "wires": [
            [
                "98372bbc.d92818"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "55cfde32.811c5",
        "type": "k neighbors classifier",
        "z": "21ce826.2ff977e",
        "name": "",
        "savePath": "test/models",
        "saveName": "knc.b",
        "neighbors": "3",
        "weights": "uniform",
        "x": 520,
        "y": 180,
        "wires": [
            [
                "98372bbc.d92818"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "e12eaf38.e871b",
        "type": "multi layer perceptron classifier",
        "z": "21ce826.2ff977e",
        "name": "",
        "savePath": "test/models",
        "saveName": "mlpc.b",
        "layers": "",
        "activation": "relu",
        "solver": "adam",
        "learningRate": "",
        "maxIter": "500",
        "batchSize": "20",
        "x": 530,
        "y": 220,
        "wires": [
            [
                "98372bbc.d92818"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "db825395.34fbf",
        "type": "random forest classifier",
        "z": "21ce826.2ff977e",
        "name": "",
        "savePath": "test/models",
        "saveName": "rfc.b",
        "criterion": "gini",
        "numTrees": "5",
        "maxDepth": "",
        "x": 530,
        "y": 260,
        "wires": [
            [
                "98372bbc.d92818"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "d0b283ca.68ff",
        "type": "support vector classifier",
        "z": "21ce826.2ff977e",
        "name": "",
        "savePath": "test/models",
        "saveName": "svc.b",
        "c": "",
        "kernel": "rbf",
        "x": 530,
        "y": 300,
        "wires": [
            [
                "98372bbc.d92818"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "efec6607.d60718",
        "type": "assessment",
        "z": "21ce826.2ff977e",
        "name": "",
        "score": "accuracy_score",
        "x": 630,
        "y": 380,
        "wires": [
            [
                "be32b25.fdbbc5"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "a6686ef9.88fa9",
        "type": "load dataset",
        "z": "21ce826.2ff977e",
        "name": "",
        "datasetFolder": "test/datasets",
        "datasetName": "iris",
        "partition": "test.csv",
        "input": false,
        "output": true,
        "x": 290,
        "y": 380,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "89ba836a.6f936",
        "type": "load dataset",
        "z": "21ce826.2ff977e",
        "name": "",
        "datasetFolder": "test/datasets",
        "datasetName": "iris",
        "partition": "test.csv",
        "input": true,
        "output": false,
        "x": 290,
        "y": 500,
        "wires": [
            [
                "7b15556d.2c6a3c",
                "c6393eed.fd155",
                "56cb443.efe90bc",
                "fb9efa03.8e7218",
                "ce891246.f9deb",
                "daebffae.a0af2"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "24adf18f.01621e",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "error",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 790,
        "y": 500,
        "wires": []
    },
    {
        "id": "be32b25.fdbbc5",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "print",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 790,
        "y": 380,
        "wires": []
    },
    {
        "id": "56cb443.efe90bc",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "knc",
        "modelPath": "test/models",
        "modelName": "knc.b",
        "x": 450,
        "y": 480,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "fb9efa03.8e7218",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "mlpc",
        "modelPath": "test/models",
        "modelName": "mlpc.b",
        "x": 450,
        "y": 520,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "ce891246.f9deb",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "rfc",
        "modelPath": "test/models",
        "modelName": "rfc.b",
        "x": 450,
        "y": 560,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "daebffae.a0af2",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "svc",
        "modelPath": "test/models",
        "modelName": "svc.b",
        "x": 450,
        "y": 600,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    },
    {
        "id": "f0dd65dd.bd7698",
        "type": "deep neural network classifier",
        "z": "21ce826.2ff977e",
        "name": "",
        "savePath": "test/models",
        "saveName": "dnn",
        "layers": "",
        "learningRate": "",
        "steps": "",
        "batchSize": "",
        "x": 530,
        "y": 140,
        "wires": [
            [
                "98372bbc.d92818"
            ],
            [
                "f55efac2.3d0498"
            ]
        ]
    },
    {
        "id": "c6393eed.fd155",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "dnn",
        "modelPath": "test/models",
        "modelName": "dnn",
        "x": 450,
        "y": 440,
        "wires": [
            [
                "efec6607.d60718"
            ],
            [
                "24adf18f.01621e"
            ]
        ]
    }
]
```
