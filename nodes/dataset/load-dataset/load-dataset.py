import pandas
import sys
import json

#read configurations
config = json.loads(input())

while True:
	#wait request
    input()
    
    if config['input'] or config['output']:
        df = pandas.read_csv(config['path'], header=None)

        r, c = df.shape

        first_column = 0 if config['input'] else c - 1
        last_column = c if config['output'] else c - 1

        df = df.iloc[:, first_column:last_column]

        if config['output'] and not config['input']:
            res = json.dumps(df[df.columns[0]].tolist())
        else:
            res = df.to_json(orient='values')
        print(res)

    else:
        print('Nothing to load.', file=sys.stderr)
