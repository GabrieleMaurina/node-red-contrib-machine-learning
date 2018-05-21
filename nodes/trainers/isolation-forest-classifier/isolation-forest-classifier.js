module.exports = function(RED){
	function iFCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'
		node.config = {
			classifier: 'isolation-forest-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				n_estimators: parseInt(config.numTrees) || undefined,
				contamination: Number(config.contamination),
				random_state: parseInt(config.seed) || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("isolation forest classifier", iFCNode)
}