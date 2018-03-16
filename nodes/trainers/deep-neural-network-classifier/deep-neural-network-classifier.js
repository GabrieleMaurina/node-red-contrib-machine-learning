module.exports = function(RED){
	function dNNCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;
		node.file = __dirname +  '\\..\\trainer.py'

		var layers = null
		try{
			layers = config.layers.replace(' ', '').split(',').map((n) => parseInt(n))
			if(layers.some(isNaN)){
				layers = null
			}
		}
		catch(err){}

		node.config = {
			classifier: 'deep-neural-network-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				layers: layers || undefined,
				batch_size: parseInt(config.batchSize) || undefined,
				learning_rate: Number(config.learningRate) || undefined,
				steps: parseInt(config.steps) || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("deep neural network classifier", dNNCNode);
}
