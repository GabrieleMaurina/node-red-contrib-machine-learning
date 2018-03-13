module.exports = function(RED){
    function PredictorNode(config){

		const READY = {fill:'blue',shape:'dot',text:'ready'};
		const PROCESSING = {fill:'yellow',shape:'dot',text:'processing'};
		const PREDICTED = {fill:'green',shape:'dot',text:'predicted'};
		const ERROR = {fill:'red',shape:'dot',text:'error'};

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

		var basePath = this.context().global.get('basePath') || '';

		exec('python "' + path.join(__dirname, pythonScript) + '" "' + path.join(basePath, config.modelPath, config.modelName) + '" ' + node.port)
		node.debug('Starting server on port ' + node.port);

		node.status(READY);
        node.on('input', function(msg) {
			node.status(PROCESSING);
			var data = msg.payload;

			request({
						url: pythonAddress + node.port + '/predict',
						json: true,
						body: data,
						method: 'POST'
					},(err, res, body) => {

						var output = [];

						if(err){
							msg.payload = err;
							node.status(ERROR);
							output = [null, msg];
							node.send(output);
						}
						else{
							msg.payload = body;
							if(res.statusCode == 200){
								node.status(PREDICTED);
                msg.topic = 'predicted'
								output = [msg, null];
							}
							else{
								node.status(ERROR);
								output = [null, msg];
							}
							node.send(output);
						}
					});
        });

		node.on('close', function(done) {
			globalContext.set(pythonPortKey, null);
			request.get(pythonAddress + node.port + '/shutdown');
			node.debug('Shutting down server on port ' + node.port);
      done()
        });
    }
    RED.nodes.registerType("Predictor", PredictorNode);
}
