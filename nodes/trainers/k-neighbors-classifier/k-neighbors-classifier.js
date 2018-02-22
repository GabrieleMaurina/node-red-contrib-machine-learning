module.exports = function(RED){
    function KNCNode(config){
		const fs = require('fs');
		const path = require('path');
		const {execSync} = require('child_process');
		const pythonScript = 'k-neighbors-classifier.py';
		const conf = 'config.json';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
		node.save = config.save;
		node.neighbors = Number(config.neighbors);
		
        node.on('input', function(msg) {
			msg.dataset.save = node.save;
			msg.dataset.neighbors = node.neighbors;
			fs.writeFile(path.join(__dirname, conf), JSON.stringify(msg.dataset), (err) => {
				if(err){
					msg.payload = err;
				}
				else{
					msg.payload = execSync('python "' + path.join(__dirname, pythonScript) + '"').toString();
				}
				node.log(msg.payload);
				node.send(msg);
			});
        });
    }
    RED.nodes.registerType("KNeighborsClassifierTrainer", KNCNode);
}