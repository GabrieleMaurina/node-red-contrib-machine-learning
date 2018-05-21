module.exports = function(RED){
	function mLPCNode(config){
		const path = require('path')
		const utils = require('../../../utils/utils')

		var node = this;

		//set configurations
		node.file = __dirname +  '/../trainer.py'

		node.config = {
			classifier: 'multi-layer-perceptron-classifier',
			save: path.join(config.savePath, config.saveName),
			kwargs: {
				hidden_layer_sizes: utils.listOfInt(config.layers) || [10, 10, 10],
				activation: config.activation || undefined,
				solver: config.solver || undefined,
				batch_size: parseInt(config.batchSize) || undefined,
				learning_rate_init: Number(config.learningRate) || undefined,
				max_iter: parseInt(config.maxIter) || undefined
			}
		}

		utils.run(RED, node, config)
	}
	RED.nodes.registerType("multi layer perceptron classifier", mLPCNode);
}
