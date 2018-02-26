from flask import Flask, request, jsonify
import pickle
import sys

model = None

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test():
	return 'Server is online.';

@app.route('/shutdown', methods=['GET'])
def shutdown():
	shutdown_server()
	return 'Server is shutting down.'

@app.route('/predict', methods=['POST'])
def predict():
	global model
	if not model:
		try:
			model = pickle.load(open(sys.argv[1], "rb"));
		except:
			res = ('Cannot load model.', 400)
	
	if model:	
		try:
			res = jsonify(model.predict(request.json).tolist())
		except:
			res = ('Wrong input format.', 400)
	return res

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

app.run(port=int(sys.argv[2]))