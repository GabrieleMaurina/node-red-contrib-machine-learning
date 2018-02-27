module.exports = function(RED){
    function KNCNode(config){		
        const trainer = require('..\\utils\\trainer.js');
		
        var node = this;
		
		node.config = {
			neighbors: Number(config.neighbors),
			file: 'k-neighbors-classifier.py'
		}
		
        trainer(RED, node, config);
    }
    RED.nodes.registerType("KNeighborsClassifier", KNCNode);
}