module.exports = function(RED){
    function MLPCNode(config){
		RED.nodes.createNode(this,config);
		
        var node = this;
		var classifier = {
			file: 'multi-layer-perceptron-classifier.py'
		}
		
        node.on('input', function(msg) {
			msg.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("MultiLayerPerceptronClassifier", MLPCNode);
}