module.exports = function(RED){
  function KNCNode(config){
    const path = require('path')
    const utils = require('../../../utils/utils')

    var node = this;
    node.file = __dirname +  '\\..\\trainer.py'
    node.config = {
      classifier: 'k-neighbors-classifier',
      save: path.join(config.savePath, config.saveName),
      kwargs: {
        n_neighbors: Number(config.neighbors) || undefined
      }
    }

    utils.run(RED, node, config)
  }
  RED.nodes.registerType("KNeighborsClassifier", KNCNode);
}
