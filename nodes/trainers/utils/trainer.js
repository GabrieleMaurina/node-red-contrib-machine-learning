module.exports = (RED, node, config) => {
	const READY = {fill:'blue',shape:'dot',text:'ready'};
	const TRAINING = {fill:'yellow',shape:'dot',text:'training'};
	const TRAINED = {fill:'green',shape:'dot',text:'trained'};
	const ERROR = {fill:'red',shape:'dot',text:'error'};
	
	const fs = require('fs');
	const path = require('path');
	const {exec} = require('child_process');
	const pythonScript = 'trainer.py';
	const file = 'train_';
	const ext = '.json';
	
	
    RED.nodes.createNode(node, config);
	var basePath = node.context().global.get('basePath') || '';
	
	node.path = path.join(__dirname, file + node.id + ext)
	
	node.config.save = path.join(basePath, config.savePath, config.saveName);
	
	node.status(READY);
	var running = false;
	node.on('input', function(msg) {
		if(!running){
			running = true;
			node.status(TRAINING);
			fs.writeFile(node.path, JSON.stringify({dataset: msg.payload, config: node.config}), (err) => {
				if(err){
					msg.payload = err;
					node.status(ERROR);
					node.send(msg);
					running = false;
				}
				else{
					exec('python "' + path.join(__dirname, pythonScript) + '" ' + node.id, (err, stdout, stderr) => {
						if(err){
							msg.payload = err;
							node.status(ERROR);
						}
						else{
							msg.payload = stdout;
							node.status(TRAINED);
						}
						node.send(msg);
						running = false;
					});
				}
			});
		}
	});
}