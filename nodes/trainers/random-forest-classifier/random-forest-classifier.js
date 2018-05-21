module.exports = function(RED){
	function rFCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'
		node.config = {
			classifier: 'random-forest-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				criterion: config.criterion,
				max_depth: parseInt(config.maxDepth) || undefined,
				n_estimators: parseInt(config.numTrees) || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("random forest classifier", rFCNode);
}
