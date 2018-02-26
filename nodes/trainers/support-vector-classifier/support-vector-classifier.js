module.exports = function(RED){
    function SupportVectorClassifierNode(config){
		
		const trainer = require('..\\utils\\trainer.js');
		
        var node = this;
		
		node.config = {
			file: 'support-vector-classifier.py',
			save: config.save
		};
		
		trainer(RED, node, config);
    }
    RED.nodes.registerType("SupportVectorClassifier", SupportVectorClassifierNode);
}