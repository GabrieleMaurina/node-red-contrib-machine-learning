module.exports = function(RED){
	function dTCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'
		node.config = {
			classifier: 'decision-tree-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				max_depth: parseInt(config.depth) || undefined,
				criterion: config.criterion || undefined,
				splitter: config.splitter || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("decision tree classifier", dTCNode)
}