module.exports = function(RED){
    function CreateDatasetNode(config){
		
		const READY = {fill:'blue',shape:'dot',text:'ready'};
		const PROCESSING = {fill:'yellow',shape:'dot',text:'processing'};
		const CREATED = {fill:'green',shape:'dot',text:'created'};
		const ERROR = {fill:'red',shape:'dot',text:'error'};
		
		const fs = require('fs');
		const path = require('path');
		const {exec} = require('child_process');
		const pythonScript = 'create-dataset.py';
		const file = 'config_';
		const ext = '.json';
		
		RED.nodes.createNode(this,config);
		
		var basePath = this.context().global.get('basePath') || '';
		
        var node = this;
		node.config = {
			path: path.join(basePath, config.path),
			save: path.join(basePath, config.saveFolder, config.saveName),
			input: config.input.replace(' ', '').split(',').map(Number),
			output: Number(config.output),
			trainingPartition: Number(config.trainingPartition)/100.0,
			shuffle: Boolean(config.shuffle),
			seed: Number(config.seed)
		}
		
		var dataPath = file + node.id + ext;
		
		node.status(READY);
		var running = false;
        node.on('input', function(msg) {
			if(!running){
				running = true;
				node.status(PROCESSING);
				fs.writeFile(path.join(__dirname, dataPath), JSON.stringify(node.config), (err) => {
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
								node.status(CREATED);
							}
							node.send(msg);
							running = false;
						});
					}
				});
			}
        });
    }
    RED.nodes.registerType("CreateDataset", CreateDatasetNode);
}