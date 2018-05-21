const status = require('./status.js')
const {spawn} = require('child_process')

const pcmd = process.platform === 'linux' ? 'python3' : 'python'

const initProc = (node) => {
	if (node.proc == null){
		node.proc = spawn(pcmd, [node.file], ['pipe', 'pipe','pipe'])

		node.proc.stdout.on('data', (data) => {
		  node.status(status.DONE)
			try{
				node.msg.payload = JSON.parse(data.toString())
			}
			catch(err){
				node.msg.payload = data.toString()
			}
			var msg = node.msg
			if(node.wires.length > 1){
				msg = [node.msg, null]
			}
			node.send(msg)
		})

		node.proc.stderr.on('data', (data) => {
			node.status(status.ERROR)
			try{
				node.msg.payload = JSON.parse(data.toString())
			}
			catch(err){
				node.msg.payload = data.toString()
			}
			var msg = node.msg
			if(node.wires.length > 1){
				msg = [null, node.msg]
			}
			node.send(msg)
		})

		node.proc.on('exit', () => {
		  node.proc = null
		})

		node.proc.stdin.write(JSON.stringify(node.config) + '\n')
	}
}

const python = (node) => {
	initProc(node)
	node.proc.stdin.write(JSON.stringify(node.msg.payload) + '\n')
}

module.exports = {
	listOfInt: (str) => {
		var ints = null
		try{
			ints = str.replace(' ', '').split(',').map((n) => parseInt(n))
			if(ints.some(isNaN)){
				ints = null
			}
		}
		finally{
			return ints
		}
	},

	run: (RED, node, config) => {
	  RED.nodes.createNode(node, config)
		node.status(status.NONE)

		node.proc = null
		node.msg = {}
		initProc(node)

		const handle = (msg) => {
			node.status(status.PROCESSING)
			node.msg = msg
			if(node.topic != undefined){
				node.msg.topic = node.topic
			}
			python(node)
		}

		node.on('input', (msg) => {
			if(node.preMsg != undefined){
				node.preMsg(msg, handle)
			}
			else{
				handle(msg)
			}
		})

		node.on('close', (done) => {
			node.status(status.NONE)
			if(node.proc != null){
				node.proc.kill()
				node.proc = null
			}
			done()
    })
	}
}
