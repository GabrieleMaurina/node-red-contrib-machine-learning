module.exports = function(RED){
  function predictorNode(config){
    const path = require('path')
    const utils = require('../../utils/utils')

    var node = this;
    
    //set configurations
    node.file = __dirname + '/predictor.py'
    node.topic = 'predicted'
    node.config = {
      path: path.join(config.modelPath, config.modelName)
    }

    utils.run(RED, node, config)
  }
  RED.nodes.registerType("predictor", predictorNode)
}
