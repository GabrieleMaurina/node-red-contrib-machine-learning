module.exports = function(RED){
    function RFCNode(config){
        const trainer = require('..\\utils\\trainer.js');

        var node = this;

    		node.config = {
          criterion: config.criterion,
    			depth: Number(config.depth),
          numTrees: Number(config.numTrees),
    			file: 'random-forest-classifier.py'
    		}

        trainer(RED, node, config);
    }
    RED.nodes.registerType("RandomForestClassifier", RFCNode);
}
