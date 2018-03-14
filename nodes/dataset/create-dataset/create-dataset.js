module.exports = function(RED){
    function CreateDatasetNode(config){
      const path = require('path')
  		const utils = require('../../../utils/utils')

      var node = this;
      node.file = __dirname + '\\create-dataset.py'
  		node.config = {
  			path: config.path,
  			save: path.join(config.saveFolder, config.saveName),
  			input: config.input.replace(' ', '').split(',').map(Number),
  			output: Number(config.output),
  			trainingPartition: Number(config.trainingPartition)/100.0,
  			shuffle: Boolean(config.shuffle),
  			seed: Number(config.seed)
  		}

      utils.run(RED, node, config)
    }
    RED.nodes.registerType("CreateDataset", CreateDatasetNode)
}
