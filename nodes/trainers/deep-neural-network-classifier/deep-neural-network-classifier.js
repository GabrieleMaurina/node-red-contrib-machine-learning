module.exports = function(RED){
	function dNNCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'

		node.config = {
			classifier: 'deep-neural-network-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				layers: utils.listOfInt(config.layers) || undefined,
				batch_size: parseInt(config.batchSize) || undefined,
				learning_rate: Number(config.learningRate) || undefined,
				steps: parseInt(config.steps) || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("deep neural network classifier", dNNCNode);
}
