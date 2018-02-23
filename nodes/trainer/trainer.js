module.exports = function(RED){
    function TNode(config){
		const fs = require('fs');
		const path = require('path');
		const {execSync} = require('child_process');
		const pythonScript = '..\\..\\python\\trainer.py';
		const conf = '..\\..\\python\\config_';
		const ext = '.json';
		
        RED.nodes.createNode(this,config);
        var node = this;
		
		node.save = config.save;
		
        node.on('input', function(msg) {
			var configuration = {
				save: node.save,
				dataset: msg.dataset,
				classifier: msg.classifier
			}
			
			fs.writeFile(path.join(__dirname, conf + node.id + ext), JSON.stringify(configuration), (err) => {
				if(err){
					msg.payload = err;
				}
				else{
					msg.payload = execSync('python "' + path.join(__dirname, pythonScript) + '" ' + node.id).toString();
				}
				node.debug(msg.payload);
				node.send(msg);
			});
        });
    }
    RED.nodes.registerType("Trainer", TNode);
}