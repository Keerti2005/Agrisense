import pandas as pd

data = pd.read_csv('../datasets/Crop_recommendation.csv')

y = list(data['label'])

print(len(y))