module.exports = function(RED){
    function MLPCNode(config){
		const classifier = 'multi-layer-perceptron-classifier.py';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
        node.on('input', function(msg) {
			msg.dataset.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("MultiLayerPerceptronClassifier", MLPCNode);
}