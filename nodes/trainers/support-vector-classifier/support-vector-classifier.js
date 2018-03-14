module.exports = function(RED){
  function SupportVectorClassifierNode(config){
    const path = require('path')
    const utils = require('../../../utils/utils')

    var node = this;
    node.file = __dirname +  '\\..\\trainer.py'
    node.config = {
      classifier: 'decision-tree-classifier',
      save: path.join(config.savePath, config.saveName),
      kwargs: {}
    }

    utils.run(RED, node, config)
  }
  RED.nodes.registerType("SupportVectorClassifier", SupportVectorClassifierNode);
}