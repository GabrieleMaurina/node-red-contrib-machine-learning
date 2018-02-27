module.exports = function(RED){
    function DTCNode(config){
        const trainer = require('..\\utils\\trainer.js');
		
        var node = this;
		
		node.config = {
			depth: Number(config.depth),
			file: 'decision-tree-classifier.py'
		}
		
        trainer(RED, node, config);
    }
    RED.nodes.registerType("DecisionTreeClassifier", DTCNode);
}