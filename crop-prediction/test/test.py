from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib
import pandas as pd
import numpy as np
import google.generativeai as genai
from twilio.rest import Client
import joblib
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

model = joblib.load('./crop_recommendation_model.pkl')
scaler = joblib.load('./scaler.pkl')
rainfall_data = joblib.load('./rainfall_data.pkl')
temperature_data = joblib.load('./temperature_data.pkl')
humidity_data = joblib.load('./humidity_data.pkl')

loaded_model = joblib.load('./crop_disease_model.pkl')
loaded_scaler = joblib.load('./scaler1.pkl')
label_encoder_disease = joblib.load('./label_encoder_disease.pkl')

data = pd.read_csv('../datasets/sample_agriculture_data.csv')


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_rainfall_data(state_name):
    filtered_data = rainfall_data[rainfall_data['SUBDIVISION'] == state_name]
    average_monthly_rainfall = filtered_data[['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']].mean()
    return average_monthly_rainfall

def get_temperature_data(state_name):
    filtered_data = temperature_data[temperature_data['SUBDIVISION'] == state_name]
    average_monthly_temperature = filtered_data[['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']].mean()
    return average_monthly_temperature

def get_humidity_data(state_name):
    filtered_data = humidity_data[humidity_data['SUBDIVISION'] == state_name]
    average_monthly_humidity = filtered_data[['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']].mean()
    return average_monthly_humidity


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        state_name = data.get('state_name')
        current_month = data.get('current_month')
        n = data.get('N')
        p = data.get('P')
        k = data.get('K')
        ph = float(data.get('ph'))

        if not state_name or not (1 <= current_month <= 12) or n is None or p is None or k is None or ph is None:
            return jsonify({'error': 'Invalid input.'}), 400

        average_monthly_rainfall = get_rainfall_data(state_name)
        next_six_months_avg_rainfall = average_monthly_rainfall[current_month-1:current_month+5].mean()

        average_monthly_temperature = get_temperature_data(state_name)
        next_six_months_avg_temperature = average_monthly_temperature[current_month-1:current_month+5].mean()

        average_monthly_humidity = get_humidity_data(state_name)
        next_six_months_avg_humidity = average_monthly_humidity[current_month-1:current_month+5].mean()

        features = pd.DataFrame([[n, p, k, next_six_months_avg_temperature, next_six_months_avg_humidity, ph, next_six_months_avg_rainfall]],
                                 columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])  # Use lowercase here


        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        
        model1 = genai.GenerativeModel("gemini-1.5-flash")
        prompt = """
        Generate a detailed guide for cultivating [Crop Name]. Include the following sections:

        1. **Overview**: Briefly describe the crop, its uses, and nutritional value.
        2. **Climate and Soil Requirements**: Specify ideal climate conditions (temperature, humidity) and soil type (pH, texture).
        3. **Preparation Steps**: Outline how to prepare the soil and select seeds.
        4. **Sowing**: Describe the sowing method (broadcasting, transplanting) and the best time for sowing.
        5. **Watering and Irrigation**: Recommend irrigation methods (drip, surface) and frequency of watering.
        6. **Fertilization**: List suitable fertilizers and application schedules.
        7. **Pest and Disease Management**: Identify common pests and diseases, and suggest control methods.
        8. **Growth Stages**: Explain the growth stages, including time taken from planting to harvest.
        9. **Harvesting**: Describe the best practices for harvesting the crop, including timing and methods.
        10. **Post-Harvest Handling**: Provide guidelines for storing and handling the crop after harvest.
        """

        crop_name = str(prediction)
        prompt = prompt.replace("[Crop Name]", crop_name)

        response = model1.generate_content(prompt)
        print(response.text)


        return jsonify({
            'guidelines': response.text
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

def send_sms_notification(to_phone_number, disease_name, guide):
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    client = Client(account_sid, auth_token)

    body = f"""
    Alert: Your Farm is Affected by {disease_name}
    
    Guide to managing the disease:
    {guide}
    
    Regards,
    AGRISENSE Team
    """

    try:
        message = client.messages.create(
            body=body,
            from_='+14437633825',
            to=to_phone_number
        )
        print(f"SMS sent successfully! SID: {message.sid}")
    except Exception as e:
        print(f"Failed to send SMS. Error: {str(e)}")


@app.route('/diseasedetection', methods=['GET'])
def diseasedetection():
    numeric_data = data.drop(columns=['date'])
    averages = numeric_data.mean()

    new_data = averages.values.reshape(1, -1)

    new_data_scaled = loaded_scaler.transform(new_data)

    predicted_disease = loaded_model.predict(new_data_scaled)
    predicted_disease_label = label_encoder_disease.inverse_transform(predicted_disease)

    model1 = genai.GenerativeModel("gemini-1.5-flash")
    prompt = """
    Generate a detailed guide for managing [Plant Disease Name]. Include the following sections:

    1. **Overview**: Briefly describe the disease, its symptoms, and impact on crops.
    2. **Causes**: Specify the primary causes of the disease (pathogen type: fungal, bacterial, viral) and environmental conditions that favor its development.
    3. **Identification**: Outline how to identify the disease, including visual signs and symptoms on plants.
    4. **Prevention**: Describe preventative measures to reduce the risk of disease occurrence, including crop rotation, sanitation, and resistant varieties.
    5. **Management Strategies**: Recommend integrated pest management (IPM) practices, including chemical and biological control methods.
    6. **Treatment Options**: List suitable fungicides, bactericides, or other treatment options and application guidelines.
    7. **Monitoring and Assessment**: Provide guidance on how to monitor for disease outbreaks and assess plant health regularly.
    8. **Impact on Yield**: Explain how the disease affects crop yield and quality, and the economic implications for farmers.
    9. **Case Studies**: Include brief case studies or examples of successful disease management strategies.
    10. **Resources**: Provide references to additional resources for farmers, including extension services, research articles, and online tools.
    """

    disease_name = predicted_disease_label[0]
    prompt = prompt.replace("[Plant Disease Name]", disease_name)

    response = model1.generate_content(prompt)
    print(response.text)

    farmer_phone_number = "+919597496287"
    disease_management_guide = "Check your farm as soon as possible"
    send_sms_notification(farmer_phone_number, disease_name, disease_management_guide)

    return jsonify({
        "Predicted Disease": disease_name,
        "Disease Management Guide": response.text
    })


if __name__ == '__main__':
    app.run(debug=True)
