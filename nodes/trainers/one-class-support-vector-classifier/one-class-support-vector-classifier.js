module.exports = function(RED){
	function oCSVCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'
		node.config = {
			classifier: 'one-class-support-vector-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				nu: Number(config.contamination) || 0.1,
				kernel: config.kernel || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("one class support vector classifier", oCSVCNode)
}