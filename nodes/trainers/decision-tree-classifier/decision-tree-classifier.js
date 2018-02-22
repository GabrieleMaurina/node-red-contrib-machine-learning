module.exports = function(RED){
    function DTCNode(config){
		const fs = require('fs');
		const path = require('path');
		const {execSync} = require('child_process');
		const pythonScript = 'decision-tree-classifier.py';
		const conf = 'config.json';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
		node.save = config.save;
		node.depth = Number(config.depth);
		
        node.on('input', function(msg) {
			msg.dataset.save = node.save;
			msg.dataset.depth = node.depth;
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
    RED.nodes.registerType("DecisionTreeClassifierTrainer", DTCNode);
}