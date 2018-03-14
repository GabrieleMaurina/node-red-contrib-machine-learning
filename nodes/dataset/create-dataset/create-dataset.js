module.exports = function(RED){
    function CreateDatasetNode(config){
      const path = require('path')
  		const utils = require('../../../utils/utils')

      var node = this;
      node.file = __dirname + '\\create-dataset.py'

      const input = null
      try{
        input = config.input.replace(' ', '').split(',').map(parseInt)
      }
      catch(err){}

  		node.config = {
  			path: config.path,
  			save: path.join(config.saveFolder, config.saveName),
  			input: input || [0],
  			output: parseInt(config.output),
  			trainingPartition: Number(config.trainingPartition)/100.0,
  			shuffle: Boolean(config.shuffle),
  			seed: parseInt(config.seed)
  		}

      utils.run(RED, node, config)
    }
    RED.nodes.registerType("CreateDataset", CreateDatasetNode)
}
