module.exports = function(RED){
    function KNCNode(config){		
        RED.nodes.createNode(this,config);
		
        var node = this;
		var classifier = {
			neighbors: Number(config.neighbors),
			file: 'k-neighbors-classifier.py'
		}
		
        node.on('input', function(msg) {
			msg.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("KNeighborsClassifier", KNCNode);
}