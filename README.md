# node-red-contrib-machine-learning
This module for Node-RED contains a set of nodes which offer machine learning functionalities.
Such nodes have a python core that takes advantage of common ML libraries such as SciKit-Learn and Tensorflow.
Classification and outlier detection can be performed through the use of this package.

## Pre requisites
Be sure to have a working installation of [Node-RED](https://nodered.org/ "Node-RED").  
Install python and the following libraries:
* [Python](https://www.python.org/ "Python") 3.6.4 or higher accessible by the command 'python' (on linux 'python3')
* [Numpy](http://www.numpy.org/ "Numpy")
* [Pandas](https://pandas.pydata.org/ "Pandas")
* [SciKit-Learn](http://scikit-learn.org "SciKit-Learn")
* [Tensorflow](https://www.tensorflow.org/ "Tensorflow") (optional: can be skipped)

## Install
To install the latest version use the Menu - Manage palette option and search for node-red-contrib-machine-learning, or run the following command in your Node-RED user directory (typically ~/.node-red):

    npm i node-red-contrib-machine-learning

## Usage
These flows create a dataset, train a model and then evaluate it. Models, after training, can be use in real scenarios to make predictions.

Flows and test datasets are available in the 'test' folder. Make sure that the paths specified inside nodes' configurations are correct before trying to execute the program.  
**Tip:** you can run 'node-red' (or 'sudo node-red' if you are uning linux) from the folder '.node-red/node-modules/node-red-contrib-machine-learning' and the paths will be automatically correct.

This flow loads a csv file, shuffles it and creates a trainig and a test partition.
![Dataset creation](https://i.imgur.com/ZkbhbTF.png "Dataset creation")

This flow loads a training partition and trains a 'decision tree classifier', saving the model locally.
![Training](https://i.imgur.com/yncaHql.png "Training")

This flow loads a test partition and evaluates a previously trained model.
![Evaluation](https://i.imgur.com/oMCfaBO.png "Evaluation")

This flow shows how to use a trained model during deploymnet. Data is received via mqtt, predictions are made and then sent back.  
![Deployment](https://i.imgur.com/an7FwAC.png "Deployment")

Example flows available here:
```json
[
    {
        "id": "da8ca300.2dfe6",
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
        "y": 80,
        "wires": [
            [
                "4fb0a8dc.f6baf8"
            ]
        ]
    },
    {
        "id": "44b6f4b0.34d7dc",
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
                "26110acb.cbf526"
            ],
            [
                "86385870.9f6b88"
            ]
        ]
    },
    {
        "id": "4f7cc53d.87a22c",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 80,
        "wires": [
            [
                "da8ca300.2dfe6"
            ]
        ]
    },
    {
        "id": "d3e9e7ab.a06d68",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "start",
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
                "44b6f4b0.34d7dc"
            ]
        ]
    },
    {
        "id": "b21982e2.99cf1",
        "type": "inject",
        "z": "21ce826.2ff977e",
        "name": "start",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 440,
        "wires": [
            [
                "f1b47338.aab82",
                "1ea9f445.89d0bc"
            ]
        ]
    },
    {
        "id": "4fb0a8dc.f6baf8",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "print",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 570,
        "y": 80,
        "wires": []
    },
    {
        "id": "86385870.9f6b88",
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
        "id": "2270c854.c34e08",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "print",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 750,
        "y": 160,
        "wires": []
    },
    {
        "id": "e69a3271.c7cab",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "decision tree classifier predictor",
        "modelPath": "test/models",
        "modelName": "dtc.b",
        "x": 550,
        "y": 420,
        "wires": [
            [
                "b8f2ab19.e693a8"
            ],
            [
                "f7c59de2.be773"
            ]
        ]
    },
    {
        "id": "26110acb.cbf526",
        "type": "decision tree classifier",
        "z": "21ce826.2ff977e",
        "name": "decision tree classifier trainer",
        "savePath": "test/models",
        "saveName": "dtc.b",
        "maxDepth": "",
        "criterion": "gini",
        "splitter": "best",
        "x": 540,
        "y": 200,
        "wires": [
            [
                "2270c854.c34e08"
            ],
            [
                "86385870.9f6b88"
            ]
        ]
    },
    {
        "id": "b8f2ab19.e693a8",
        "type": "assessment",
        "z": "21ce826.2ff977e",
        "name": "",
        "score": "accuracy_score",
        "x": 590,
        "y": 360,
        "wires": [
            [
                "808a0c93.8ee38"
            ],
            [
                "f7c59de2.be773"
            ]
        ]
    },
    {
        "id": "f1b47338.aab82",
        "type": "load dataset",
        "z": "21ce826.2ff977e",
        "name": "",
        "datasetFolder": "test/datasets",
        "datasetName": "iris",
        "partition": "test.csv",
        "input": false,
        "output": true,
        "x": 290,
        "y": 360,
        "wires": [
            [
                "b8f2ab19.e693a8"
            ],
            [
                "f7c59de2.be773"
            ]
        ]
    },
    {
        "id": "1ea9f445.89d0bc",
        "type": "load dataset",
        "z": "21ce826.2ff977e",
        "name": "",
        "datasetFolder": "test/datasets",
        "datasetName": "iris",
        "partition": "test.csv",
        "input": true,
        "output": false,
        "x": 290,
        "y": 480,
        "wires": [
            [
                "e69a3271.c7cab"
            ],
            [
                "f7c59de2.be773"
            ]
        ]
    },
    {
        "id": "f7c59de2.be773",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "error",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 790,
        "y": 480,
        "wires": []
    },
    {
        "id": "808a0c93.8ee38",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "print",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 790,
        "y": 360,
        "wires": []
    },
    {
        "id": "8a4ea95c.f860b8",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "decision tree classifier predictor",
        "modelPath": "test/models",
        "modelName": "dtc.b",
        "x": 450,
        "y": 580,
        "wires": [
            [
                "e967043f.480868"
            ],
            [
                "e66df10b.40ba8"
            ]
        ]
    },
    {
        "id": "e967043f.480868",
        "type": "mqtt out",
        "z": "21ce826.2ff977e",
        "name": "",
        "topic": "predictions",
        "qos": "",
        "retain": "",
        "broker": "cb216faf.d9136",
        "x": 730,
        "y": 540,
        "wires": []
    },
    {
        "id": "e66df10b.40ba8",
        "type": "debug",
        "z": "21ce826.2ff977e",
        "name": "error",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 710,
        "y": 620,
        "wires": []
    },
    {
        "id": "3cd1a442.2bc73c",
        "type": "mqtt in",
        "z": "21ce826.2ff977e",
        "name": "",
        "topic": "classification",
        "qos": "2",
        "broker": "cb216faf.d9136",
        "x": 140,
        "y": 580,
        "wires": [
            [
                "8a4ea95c.f860b8"
            ]
        ]
    },
    {
        "id": "cb216faf.d9136",
        "type": "mqtt-broker",
        "z": "",
        "name": "",
        "broker": "iot.eclipse.org",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": ""
    }
]
```
