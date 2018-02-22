module.exports = function(RED){
    function DTCNode(config){
		const classifier = 'decision-tree-classifier.py';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
		node.depth = Number(config.depth);
		
        node.on('input', function(msg) {
			msg.dataset.depth = node.depth;
			msg.dataset.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("DecisionTreeClassifier", DTCNode);
}