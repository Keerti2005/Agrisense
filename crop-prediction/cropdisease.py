import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

df = pd.read_csv('./datasets/crop-disease-indian-crops.csv')

print("Columns in the dataset:", df.columns)

label_encoder_disease = LabelEncoder()
df['disease'] = label_encoder_disease.fit_transform(df['disease'])

scaler = StandardScaler()
features = df.drop(['disease'], axis=1)

print("Shape of features used for training:", features.shape)

scaled_features = scaler.fit_transform(features)

X = scaled_features
y = df['disease']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

joblib.dump(model, 'crop_disease_model.pkl')
joblib.dump(scaler, 'scaler1.pkl')

loaded_model = joblib.load('crop_disease_model.pkl')
loaded_scaler = joblib.load('scaler1.pkl')

new_data = [[30.5, 80.3, 60.4, 50.0, 20.0, 30.0, 6.5, 200]]

new_data_scaled = loaded_scaler.transform(new_data)
predicted_disease = loaded_model.predict(new_data_scaled)
print("Predicted Disease:", label_encoder_disease.inverse_transform(predicted_disease))
