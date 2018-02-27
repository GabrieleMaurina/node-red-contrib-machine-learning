module.exports = function(RED){
    function MLPCNode(config){
		const trainer = require('..\\utils\\trainer.js');
		
        var node = this;
		
		node.config = {
			file: 'multi-layer-perceptron-classifier.py'
		}
		
        trainer(RED, node, config);
    }
    RED.nodes.registerType("MultiLayerPerceptronClassifier", MLPCNode);
}