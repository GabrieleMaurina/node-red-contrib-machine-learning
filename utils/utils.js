const status = require('./status.js')
const {spawn} = require('child_process')

//use 'python3' on linux and 'python' on anything else
const pcmd = process.platform === 'linux' ? 'python3' : 'python'

//initialize child process
const initProc = (node) => {
	if (node.proc == null){
		node.proc = spawn(pcmd, [node.file], ['pipe', 'pipe','pipe'])

		//handle results
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

		//handle errors
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

		//handle crashes
		node.proc.on('exit', () => {
		  node.proc = null
		})

		//send node configurations to child
		node.proc.stdin.write(JSON.stringify(node.config) + '\n')
	}
}

//send payload as json to python script
const python = (node) => {
	initProc(node)
	node.proc.stdin.write(JSON.stringify(node.msg.payload) + '\n')
}

module.exports = {
	//parse string containing comma separated integers
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

	//initialize node
	run: (RED, node, config) => {
	  RED.nodes.createNode(node, config)
		node.status(status.NONE)

		node.proc = null
		node.msg = {}
		initProc(node)

		//process message
		const handle = (msg) => {
			node.status(status.PROCESSING)
			node.msg = msg
			if(node.topic != undefined){
				node.msg.topic = node.topic
			}
			//send to python child
			python(node)
		}

		//handle input
		node.on('input', (msg) => {
			//if the node requires preprocessing of message, call preMsg
			if(node.preMsg != undefined){
				node.preMsg(msg, handle)
			}
			else{
				handle(msg)
			}
		})

		//when node is closed, kill child process
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
