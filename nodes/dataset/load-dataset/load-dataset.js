module.exports = function(RED){
    function LoadDatasetNode(config){
		
		const READY = {fill:'blue',shape:'dot',text:'ready'};
		const PROCESSING = {fill:'yellow',shape:'dot',text:'processing'};
		const LOADED = {fill:'green',shape:'dot',text:'loaded'};
		const ERROR = {fill:'red',shape:'dot',text:'error'};
		
		const path = require('path');
		const fs = require('fs');
		
        RED.nodes.createNode(this,config);
		
        var node = this;
		node.path = path.join(config.datasetFolder, config.datasetName, config.partition || 'train.json');
		node.input = Boolean(config.input);
		node.output = Boolean(config.output);
		
		node.status(READY);
		var running = false;
        node.on('input', function(msg) {
			if(!running){
				running = true;
				node.status(PROCESSING);
				fs.readFile(node.path, (err, dataset) => {
					if(err){
						msg.payload = err;
						node.status(ERROR);
						node.send(msg);
						running = false;
					}
					else{
						msg.payload = JSON.parse(dataset);
						
						if(!node.input){
							for(var row of msg.payload){
								row.splice(0, row.length - 1);
							}
						}
						
						if(!node.output){
							for(var row of msg.payload){
								row.pop();
							}
						}
						
						node.status(LOADED);
						node.send(msg);
						running = false;
					}
				});
			}
        });
    }
    RED.nodes.registerType("LoadDataset", LoadDatasetNode);
}