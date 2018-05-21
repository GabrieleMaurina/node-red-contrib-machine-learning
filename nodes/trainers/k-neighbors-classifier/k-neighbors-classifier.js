module.exports = function(RED){
	function kNCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;
		
		//set configurations
		node.file = __dirname +  '/../trainer.py'
		node.config = {
			classifier: 'k-neighbors-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				n_neighbors: parseInt(config.neighbors) || undefined,
				weights : config.weights || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("k neighbors classifier", kNCNode);
}
