module.exports = function(RED){
	function eECNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'
		node.config = {
			classifier: 'elliptic-envelope-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				assume_centered: Boolean(config.centered) || undefined,
				support_fraction: Number(config.fraction) || undefined,
				contamination: Number(config.contamination),
				random_state: parseInt(config.seed) || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("elliptic envelope classifier", eECNode)
}