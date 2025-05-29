from flask import Flask, jsonify , request
import datetime
from convex import ConvexClient
import os
from dotenv import load_dotenv

load_dotenv(".env.local")
load_dotenv()


app = Flask(__name__)

client = ConvexClient(os.getenv("CONVEX_URL"))

@app.route('/api/data22', methods=['POST'])
def upsert_sensor_data():
    data = request.json
    device_id = data.get('device_id')
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    light_intensity = data.get('light_intensity')
    soil_moisture = data.get('soil_moisture')
    wind_speed = data.get('wind_speed')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    nitrogen = data.get('nitrogen')
    phosphorus = data.get('phosphorus')
    potassium = data.get('potassium')
    water_level = data.get('water_level')
    gas = data.get('gas')
    fire = data.get('fire')
    ph_value = data.get('ph_value')
    irrigation = data.get('irrigation')
    irrigation_time = data.get('irrigation_time')
    
    current_time = datetime.datetime.now().isoformat()
    
    
    previous_data = client.query("myFunctions:fetchAllData", {"device_id": device_id})
    d1 = previous_data[0] if previous_data else {}
    if 'current_temperature' in d1:
            print(d1['current_temperature'])
         
    try:
        if d1:
            client.mutation("myFunctions:upsertSensorData", {
                "device_id": device_id,
                "current_time": current_time,
                "current_humidity": humidity,
                "current_light_intensity": light_intensity,
                "current_soil_moisture": soil_moisture,
                "current_temperature": temperature,
                "current_wind_speed": wind_speed,
                "current_nitrogen": nitrogen,
                "current_phosphorus": phosphorus,
                "current_potassium": potassium,
                "current_water_level": water_level,
                "latitude": latitude,
                "longitude": longitude,
                "fire_status": fire,
                "gas_status": gas,
                "ph_value": ph_value,
                "irrigation": irrigation,
                "irrigation_time": irrigation_time,
                "previous_time": d1['current_time'],
                "previous_humidity": d1['current_humidity'],
                "previous_light_intensity": d1['current_light_intensity'],
                "previous_soil_moisture": d1['current_soil_moisture'],
                "previous_temperature": d1['current_temperature'],
                "previous_wind_speed": d1['current_wind_speed'],
                "previous_nitrogen": d1['current_nitrogen'],
                "previous_phosphorus": d1['current_phosphorus'],
                "previous_potassium": d1['current_potassium'],
                "previous_water_level": d1['current_water_level'],
                "previous1_time": d1['previous_time'],
                "previous1_humidity": d1['previous_humidity'],
                "previous1_light_intensity": d1['previous_light_intensity'],
                "previous1_soil_moisture": d1['previous_soil_moisture'],
                "previous1_temperature": d1['previous_temperature'],
                "previous1_wind_speed": d1['previous_wind_speed'],
                "previous1_nitrogen": d1['previous_nitrogen'],
                "previous1_phosphorus": d1['previous_phosphorus'],
                "previous1_potassium": d1['previous_potassium'],
                "previous1_water_level": d1['previous_water_level'],
                "previous2_time": d1['previous1_time'],
                "previous2_humidity": d1['previous1_humidity'],
                "previous2_light_intensity": d1['previous1_light_intensity'],
                "previous2_soil_moisture": d1['previous1_soil_moisture'],
                "previous2_temperature": d1['previous1_temperature'],
                "previous2_wind_speed": d1['previous1_wind_speed'],
                "previous2_nitrogen": d1['previous1_nitrogen'],
                "previous2_phosphorus": d1['previous1_phosphorus'],
                "previous2_potassium": d1['previous1_potassium'],
                "previous2_water_level": d1['previous1_water_level'],
                "previous3_time": d1['previous2_time'],
                "previous3_humidity": d1['previous2_humidity'],
                "previous3_light_intensity": d1['previous2_light_intensity'],
                "previous3_soil_moisture": d1['previous2_soil_moisture'],
                "previous3_temperature": d1['previous2_temperature'],
                "previous3_wind_speed": d1['previous2_wind_speed'],
                "previous3_nitrogen": d1['previous2_nitrogen'],
                "previous3_phosphorus": d1['previous2_phosphorus'],
                "previous3_potassium": d1['previous2_potassium'],
                "previous3_water_level": d1['previous2_water_level'],
                "previous4_time": d1['previous3_time'],
                "previous4_humidity": d1['previous3_humidity'],
                "previous4_light_intensity": d1['previous3_light_intensity'],
                "previous4_soil_moisture": d1['previous3_soil_moisture'],
                "previous4_temperature": d1['previous3_temperature'],
                "previous4_wind_speed": d1['previous3_wind_speed'],
                "previous4_nitrogen": d1['previous3_nitrogen'],
                "previous4_phosphorus": d1['previous3_phosphorus'],
                "previous4_potassium": d1['previous3_potassium'],
                "previous4_water_level": d1['previous3_water_level'],
                "previous5_time": d1['previous4_time'],
                "previous5_humidity": d1['previous4_humidity'],
                "previous5_light_intensity": d1['previous4_light_intensity'],
                "previous5_soil_moisture": d1['previous4_soil_moisture'],
                "previous5_temperature": d1['previous4_temperature'],
                "previous5_wind_speed": d1['previous4_wind_speed'],
                "previous5_nitrogen": d1['previous4_nitrogen'],
                "previous5_phosphorus": d1['previous4_phosphorus'],
                "previous5_potassium": d1['previous4_potassium'],
                "previous5_water_level": d1['previous4_water_level'],
            })
        else:
            client.mutation("myFunctions:upsertSensorData", {
                "device_id": device_id,
                "current_time": current_time,
                "current_humidity": humidity,
                "current_light_intensity": light_intensity,
                "current_soil_moisture": soil_moisture,
                "current_temperature": temperature,
                "current_wind_speed": wind_speed,
                "current_nitrogen": nitrogen,
                "current_phosphorus": phosphorus,
                "current_potassium": potassium,
                "current_water_level": water_level,
                "latitude": latitude,
                "longitude": longitude,
                "fire_status": fire,
                "gas_status": gas,
                "ph_value": ph_value,
                "irrigation": irrigation,
                "irrigation_time": irrigation_time,
                "previous_time": "NA",
                "previous_humidity": 0.0,
                "previous_light_intensity": 0.0,
                "previous_soil_moisture": 0.0,
                "previous_temperature": 0.0,
                "previous_wind_speed": 0.0,
                "previous_nitrogen": 0.0,
                "previous_phosphorus": 0.0,
                "previous_potassium": 0.0,
                "previous_water_level": 0.0,
                "previous1_time": "NA",
                "previous1_humidity": 0.0,
                "previous1_light_intensity": 0.0,
                "previous1_soil_moisture": 0.0,
                "previous1_temperature": 0.0,
                "previous1_wind_speed": 0.0,
                "previous1_nitrogen": 0.0,
                "previous1_phosphorus": 0.0,
                "previous1_potassium": 0.0,
                "previous1_water_level": 0.0,
                "previous2_time": "NA",
                "previous2_humidity": 0.0,
                "previous2_light_intensity": 0.0,
                "previous2_soil_moisture": 0.0,
                "previous2_temperature": 0.0,
                "previous2_wind_speed": 0.0,
                "previous2_nitrogen": 0.0,
                "previous2_phosphorus": 0.0,
                "previous2_potassium": 0.0,
                "previous2_water_level": 0.0,
                "previous3_time": "NA",
                "previous3_humidity": 0.0,
                "previous3_light_intensity": 0.0,
                "previous3_soil_moisture": 0.0,
                "previous3_temperature": 0.0,
                "previous3_wind_speed": 0.0,
                "previous3_nitrogen": 0.0,
                "previous3_phosphorus": 0.0,
                "previous3_potassium": 0.0,
                "previous3_water_level": 0.0,
                "previous4_time": "NA",
                "previous4_humidity": 0.0,
                "previous4_light_intensity": 0.0,
                "previous4_soil_moisture": 0.0,
                "previous4_temperature": 0.0,
                "previous4_wind_speed": 0.0,
                "previous4_nitrogen": 0.0,
                "previous4_phosphorus": 0.0,
                "previous4_potassium": 0.0,
                "previous4_water_level": 0.0,
                "previous5_time": "NA",
                "previous5_humidity": 0.0,
                "previous5_light_intensity": 0.0,
                "previous5_soil_moisture": 0.0,
                "previous5_temperature": 0.0,
                "previous5_wind_speed": 0.0,
                "previous5_nitrogen": 0.0,
                "previous5_phosphorus": 0.0,
                "previous5_potassium": 0.0,
                "previous5_water_level": 0.0,
        })
            
        return jsonify({"message": "Sensor data added successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Error adding sensor data: {e}"}), 500

@app.route('/api/data', methods=['POST'])
def sensor_data():
    data = request.json

    return data
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)

