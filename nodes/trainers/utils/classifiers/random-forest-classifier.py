from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(criterion=training['config']['criterion'], n_estimators=training['config']['numTrees'], max_depth=training['config']['depth'])
