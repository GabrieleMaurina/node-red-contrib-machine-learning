module.exports = function(RED){
  function MLPCNode(config){
    const path = require('path')
    const utils = require('../../../utils/utils')

    var node = this;
    node.file = __dirname +  '\\..\\trainer.py'

    var layers = null
    try{
      layers = config.layers.replace(' ', '').split(',').map((n) => parseInt(n))
    }
    catch(err){}

    node.config = {
      classifier: 'multi-layer-perceptron-classifier',
      save: path.join(config.savePath, config.saveName),
      kwargs: {
        hidden_layer_sizes: layers || undefined,
        activation: config.activation || undefined,
        solver: config.solver || undefined,
        batch_size: parseInt(config.batchSize) || undefined,
        learning_rate_init: Number(config.learningRate) || undefined,
        max_iter: parseInt(config.maxIter) || undefined
      }
    }

    utils.run(RED, node, config)
  }
  RED.nodes.registerType("MultiLayerPerceptronClassifier", MLPCNode);
}
