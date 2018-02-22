module.exports = function(RED){
    function SVCNode(config){
		const classifier = 'support-vector-classifier.py';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
        node.on('input', function(msg) {
			msg.dataset.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("SupportVectorClassifier", SVCNode);
}