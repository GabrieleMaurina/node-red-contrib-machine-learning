module.exports = function(RED){
    function SVCNode(config){
		RED.nodes.createNode(this,config);
		
        var node = this;
		var classifier = {
			file: 'support-vector-classifier.py'
		}
		
        node.on('input', function(msg) {
			msg.classifier = classifier;
			node.send(msg);
        });
    }
    RED.nodes.registerType("SupportVectorClassifier", SVCNode);
}