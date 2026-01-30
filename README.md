# IoT Sensor Backend Service

A Node.js backend service that ingests IoT sensor temperature readings, stores them in MongoDB Atlas, and exposes APIs to retrieve the latest reading per device.  
The service also supports real-time ingestion using MQTT (publish–subscribe model).

---

## 🚀 Features

- REST API to ingest sensor readings
- REST API to fetch the latest reading for a device
- MongoDB Atlas integration using Mongoose
- Automatic timestamp handling
- Input validation
- Optimized queries using compound indexes
- MQTT subscriber for real-time sensor data ingestion

---

## 🛠 Tech Stack

- Node.js (18+)
- Express.js
- MongoDB Atlas
- Mongoose
- MQTT (Mosquitto public broker)

---

## 📦 Project Structure

src/
┣ config/

┃ ┗ db.js

┣ models/

┃ ┗ SensorReading.js

┣ controllers/

┃ ┗ sensor.controller.js

┣ routes/

┃ ┗ sensor.routes.js

┣ mqtt/

┃ ┗ subscriber.js

┣ app.js

┗ server.js


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd sensor-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a .env file in the root directory:
```bash
PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
```

### 4️⃣ Run the Server
```bash
npm run dev
```
Expected output:
```bash
MongoDB connected
Starting MQTT subscriber...
Server running on port 5000
MQTT connected
Subscribed to topic: iot/sensor/+/temperature
```

---

## 📡 API Endpoints

### ▶ POST /api/sensor/ingest

Ingest a sensor reading.

Request Body
```bash
{
  "deviceId": "sensor-01",
  "temperature": 32.5,
  "timestamp": 1705312440000
}
```
-timestamp is optional (defaults to current time)


### ▶ GET /api/sensor/:deviceId/latest

Fetch the latest reading for a device.

Example
```bash
GET /api/sensor/sensor-01/latest
```

### 🧪 Postman / curl Examples

🔹 Ingest Reading (POST) 
```bash
curl -X POST http://localhost:5000/api/sensor/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "sensor-01",
    "temperature": 34.7
  }'
```
Response
```bash
{
    "success": true,
    "data": {
        "deviceId": "sensor-01",
        "temperature": 34.7,
        "timestamp": 1769773383211,
        "_id": "697c9947bb2bb5dcc7d32b99",
        "createdAt": "2026-01-30T11:43:03.219Z",
        "__v": 0
    }
}
```

🔹 Get Latest Reading (GET)

GET http://localhost:5000/api/sensor/sensor-01/latest

Response
```bash
{
    "_id": "697c9947bb2bb5dcc7d32b99",
    "deviceId": "sensor-01",
    "temperature": 34.7,
    "timestamp": 1769773383211,
    "createdAt": "2026-01-30T11:43:03.219Z",
    "__v": 0
}
```

### 📡 MQTT Bonus (Real-time Ingestion)

▶ Subscribed Topic
```bash
iot/sensor/<deviceId>/temperature
```

▶ Example Publish (Mosquitto CLI)
```bash
mosquitto_pub -h test.mosquitto.org -p 1883 \
  -t iot/sensor/sensor-01/temperature \
  -m 41.2
```

This message is automatically:
- Received by the MQTT subscriber
- Stored in MongoDB
- Available via GET /api/sensor/sensor-01/latest


### ✅ Requirements Satisfied
REST APIs implemented
- MongoDB Atlas free-tier used
- Input validation handled
- MQTT subscriber implemented
- Node.js 18+ compatible

---

### 👨‍💻 Author

Om Gaikwad

ECE , IIIT Pune
