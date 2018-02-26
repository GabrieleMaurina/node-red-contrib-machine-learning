module.exports = function(RED){
    function AssessmentNode(config){
		
		const READY = {fill:'blue',shape:'dot',text:'ready'};
		const PROCESSING = {fill:'yellow',shape:'dot',text:'processing'};
		const DONE = {fill:'green',shape:'dot',text:'done'};
		const ERROR = {fill:'red',shape:'dot',text:'error'};
		
		const fs = require('fs');
		const path = require('path');
		const {exec} = require('child_process');
		const pythonScript = 'assessment.py';
		const file = 'assessment_';
		const ext = '.json';
		
		RED.nodes.createNode(this,config);
		
        var node = this;
		node.name = config.name;
		node.data = {};
		
		node.status(READY);
		var p = 0;
        node.on('input', function(msg) {
			node.status(PROCESSING);
			
			if(msg.topic == 'real'){
				node.data.real = msg.payload;
			}
			else if(msg.topic == 'predicted'){
				node.data.predicted = msg.payload;
			}
			
			if(node.data.real && node.data.predicted){
				p++;
				var id = p;
				
				var data = node.data;
				
				fs.writeFile(path.join(__dirname, file + node.id + id + ext), JSON.stringify(data), (err) => {
					if(err){
						msg.payload = err;
						node.status(ERROR);
						node.send(msg);
					}
					else{
						exec('python "' + path.join(__dirname, pythonScript) + '" ' + node.id + id + ' "' + node.name + '"', (err, stdout, stderr) => {
							if(err){
								msg.payload = err;
								node.status(ERROR);
							}
							else{
								msg.payload = Number(stdout);
								node.status(DONE);
							}
							node.send(msg);
						});
					}
				});
			}
        });
    }
    RED.nodes.registerType("Assessment", AssessmentNode);
}