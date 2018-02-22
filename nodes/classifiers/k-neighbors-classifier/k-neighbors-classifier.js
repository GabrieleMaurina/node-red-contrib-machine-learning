module.exports = function(RED){
    function KNCNode(config){
		const classifier = 'k-neighbors-classifier.py';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
		node.neighbors = Number(config.neighbors);
		
        node.on('input', function(msg) {
			msg.dataset.neighbors = node.neighbors;
			msg.dataset.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("KNeighborsClassifier", KNCNode);
}