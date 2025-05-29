// This code reads sensor data, sends it to a backend server, and the server stores the data in a Convex database.

#include <ESP8266WiFi.h>
#include <DHT.h>
#include <WiFiClient.h>

const char* ssid = "Iphone 11";
const char* password = "0987654321";
const char* serverName = "agrisense-world.onrender.com";

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define NPK_PIN_N A0
#define NPK_PIN_P A1
#define NPK_PIN_K A2
#define SOIL_MOISTURE_PIN A3
#define LIGHT_PIN A4
#define PH_PIN A6
#define GAS_PIN A7
#define FIRE_PIN 3
#define WATER_LEVEL_PIN 4
#define WIND_SPEED_PIN A5
#define MOTOR_PIN 5

void setup() {
  Serial.begin(115200);
  delay(10);

  dht.begin();

  pinMode(FIRE_PIN, INPUT);
  pinMode(WATER_LEVEL_PIN, INPUT);
  pinMode(MOTOR_PIN, OUTPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int nValue = analogRead(NPK_PIN_N);
  int pValue = analogRead(NPK_PIN_P);
  int kValue = analogRead(NPK_PIN_K);
  int soilMoisture = analogRead(SOIL_MOISTURE_PIN);
  int phValue = analogRead(PH_PIN);
  int gasValue = analogRead(GAS_PIN);
  int fireDetected = digitalRead(FIRE_PIN);
  int waterLevel = digitalRead(WATER_LEVEL_PIN);
  int windSpeed = analogRead(WIND_SPEED_PIN);
  int motorState = digitalRead(MOTOR_PIN);

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  WiFiClient client;
  if (!client.connect(serverName, 443)) {
    Serial.println("Connection to server failed");
    return;
  }

  if (soilMoisture < 400) {
    digitalWrite(MOTOR_PIN, HIGH);
  } else {
    digitalWrite(MOTOR_PIN, LOW);
  }
  
  String postData = "{\"device_id\":\"ab01\",";
  postData += "\"temperature\":";
  postData += temperature;
  postData += ",\"humidity\":";
  postData += humidity;
  postData += ",\"N\":";
  postData += nValue;
  postData += ",\"P\":";
  postData += pValue;
  postData += ",\"K\":";
  postData += kValue;
  postData += ",\"soil_moisture\":";
  postData += soilMoisture;
  postData += ",\"pH\":";
  postData += phValue;
  postData += ",\"gas\":";
  postData += gasValue;
  postData += ",\"fire_detected\":";
  postData += fireDetected;
  postData += ",\"water_level\":";
  postData += waterLevel;
  postData += ",\"wind_speed\":";
  postData += windSpeed;
  postData += ",\"motor_state\":";
  postData += motorState;
  postData += "}";

  client.println("POST api/data22 HTTP/1.1");
  client.println("Host: final-04do.onrender.com");
  client.println("Content-Type: application/json");
  client.print("Content-Length: ");
  client.println(postData.length());
  client.println();
  client.println(postData);

  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  client.stop();

  delay(30000);
}
