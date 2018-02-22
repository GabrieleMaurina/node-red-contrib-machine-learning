module.exports = function(RED){
    function DatasetNode(config){
        RED.nodes.createNode(this,config);
		
        var node = this;
		var dataset = {
				path: config.path,
				input: config.input.replace(' ', '').split(',').map(Number),
				output: Number(config.output),
				amount: Number(config.amount) 
			}
		
        node.on('input', function(msg) {
			msg.dataset = dataset;
            node.send(msg);
        });
    }
    RED.nodes.registerType("Dataset", DatasetNode);
}