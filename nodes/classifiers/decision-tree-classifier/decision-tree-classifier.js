module.exports = function(RED){
    function DTCNode(config){
        RED.nodes.createNode(this,config);
		
        var node = this;
		var classifier = {
			depth: Number(config.depth),
			file: 'decision-tree-classifier.py'
		}
		
        node.on('input', function(msg) {
			msg.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("DecisionTreeClassifier", DTCNode);
}