module.exports = function(RED){
    function PredictorNode(config){
		const path = require('path');
		const {exec} = require('child_process');
		const request = require('request');
		const pythonScript = 'predictor.py';
		const pythonPortKey = 'pythonPort';
		const pythonPort = 6900;
		const pythonAddress = 'http://localhost:';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
		var globalContext = this.context().global;
		node.port = globalContext.get(pythonPortKey) || pythonPort;
		globalContext.set(pythonPortKey, node.port + 1);
		
		exec('python "' + path.join(__dirname, pythonScript) + '" "' + config.model + '" ' + node.port)
		node.log('Starting server on port ' + node.port);
		
        node.on('input', function(msg) {
			
			var data = msg.payload;
			
			request(
				{url: pythonAddress + node.port + '/predict', json: true, body: data, method: 'POST'},
				(err, res, body) => {
					msg.payload = body;
					node.log('Request to ' + node.port + ' with payload ' + JSON.stringify(data) + ' and response ' + JSON.stringify(body));
					node.send(msg);
				});
        });
		
		node.on('close', function() {
			globalContext.set(pythonPortKey, null);
			request.get(pythonAddress + node.port + '/shutdown');
			node.log('Shutting down server on port ' + node.port);
        });
    }
    RED.nodes.registerType("Predictor", PredictorNode);
}