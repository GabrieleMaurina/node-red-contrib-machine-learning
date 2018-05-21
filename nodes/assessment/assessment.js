module.exports = function(RED){
	function assessmentNode(config){
		const utils = require('../../utils/utils')

		var node = this;
		
		//set configurations
		node.file = __dirname + '/assessment.py'
		node.config = {
			score: config.score
		}
		node.data = {}

		//handle messages
		node.preMsg = (msg, done) => {
			if(msg.topic.toLowerCase() == 'real'){
				node.data.real = msg.payload
			}
			else if(msg.topic.toLowerCase() == 'predicted'){
				node.data.predicted = msg.payload
				if(node.data.real){
					msg.payload = node.data
					done(msg)
				}
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("assessment", assessmentNode);
}
