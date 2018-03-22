import sys
import pandas

if len(sys.argv) > 1:
	inp = sys.argv[1]
else:
	inp = 'iris.data'

if len(sys.argv) > 2:
	outp = sys.argv[2]
else:
	outp = 'iris-novelty.data'

if len(sys.argv) > 3:
	outlier = sys.argv[3]
else:
	outlier = 'Iris-virginica'

df = pandas.read_csv(inp, header=None)

for i in range(len(df[4])):
	df[4][i] = -1 if df[4][i] == outlier else 1

print(df)

df.to_csv(outp, header=None, index=False)