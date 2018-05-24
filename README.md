# node-red-contrib-machine-learning
This module for Node-RED contains a set of nodes which offer machine learning functionalities.
Such nodes have a python core that takes advantage of common ML libraries such as SciKit-Learn and Tensorflow.
Classification and outlier detection can be performed through the use of this package.

## Pre requisites
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

Flows and test datasets are available in the 'test' folder. Make sure that the paths specified inside the nodes' configurations are correct before trying to execute the program.  
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
        "id": "93db356f.293b98",
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
                "9ff35f4d.c2ad9"
            ]
        ]
    },
    {
        "id": "207460b8.c41f3",
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
                "c59a7c79.3f134"
            ],
            [
                "ad3be981.48d948"
            ]
        ]
    },
    {
        "id": "726efdc3.fa33e4",
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
        "y": 80,
        "wires": [
            [
                "93db356f.293b98"
            ]
        ]
    },
    {
        "id": "c3708b63.07fc58",
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
                "207460b8.c41f3"
            ]
        ]
    },
    {
        "id": "b38a012c.50199",
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
        "y": 440,
        "wires": [
            [
                "d7fb8e35.b024e",
                "13076c8a.76e763"
            ]
        ]
    },
    {
        "id": "9ff35f4d.c2ad9",
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
        "id": "ad3be981.48d948",
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
        "id": "62ddfeb7.a671e",
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
        "id": "20466934.bdedb6",
        "type": "predictor",
        "z": "21ce826.2ff977e",
        "name": "decision tree classifier predictor",
        "modelPath": "test/models",
        "modelName": "dtc.b",
        "x": 550,
        "y": 420,
        "wires": [
            [
                "eb276c42.4871d"
            ],
            [
                "ee14e0a4.64677"
            ]
        ]
    },
    {
        "id": "c59a7c79.3f134",
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
                "62ddfeb7.a671e"
            ],
            [
                "ad3be981.48d948"
            ]
        ]
    },
    {
        "id": "eb276c42.4871d",
        "type": "assessment",
        "z": "21ce826.2ff977e",
        "name": "",
        "score": "accuracy_score",
        "x": 590,
        "y": 360,
        "wires": [
            [
                "44e5117c.d4fd"
            ],
            [
                "ee14e0a4.64677"
            ]
        ]
    },
    {
        "id": "d7fb8e35.b024e",
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
                "eb276c42.4871d"
            ],
            [
                "ee14e0a4.64677"
            ]
        ]
    },
    {
        "id": "13076c8a.76e763",
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
                "20466934.bdedb6"
            ],
            [
                "ee14e0a4.64677"
            ]
        ]
    },
    {
        "id": "ee14e0a4.64677",
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
        "id": "44e5117c.d4fd",
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
    }
]
```
