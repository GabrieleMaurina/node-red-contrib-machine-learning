module.exports = function(RED){
	function createDatasetNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname + '/create-dataset.py'
		node.config = {
			path: config.path,
			save: path.join(config.saveFolder, config.saveName),
			input: utils.listOfInt(config.input) || [0],
			output: parseInt(config.output) || undefined,
			trainingPartition: (Number(config.trainingPartition) || 80.0) / 100.0,
			shuffle: Boolean(config.shuffle),
			seed: parseInt(config.seed) || 0
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("create dataset", createDatasetNode)
}
