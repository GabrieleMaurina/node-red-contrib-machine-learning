module.exports = function(RED){
  function RFCNode(config){
    const path = require('path')
    const utils = require('../../../utils/utils')

    var node = this;
    node.file = __dirname +  '\\..\\trainer.py'
    node.config = {
      classifier: 'random-forest-classifier',
      save: path.join(config.savePath, config.saveName),
      kwargs: {
        criterion: config.criterion,
        max_depth: Number(config.depth) || undefined,
        n_estimators: Number(config.numTrees) || undefined
      }
    }

    utils.run(RED, node, config)
  }
  RED.nodes.registerType("RandomForestClassifier", RFCNode);
}
