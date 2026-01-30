import mqtt from "mqtt";
import SensorReading from "../models/SensorReading.js";

const MQTT_BROKER = "mqtt://test.mosquitto.org:1883";


const TOPIC = "iot/sensor/+/temperature";

export const startMqttSubscriber = () => {
   console.log("Starting MQTT subscriber...");

  const client = mqtt.connect(MQTT_BROKER);

  client.on("connect", () => {
    console.log("MQTT connected");
    client.subscribe(TOPIC, () => {
      console.log(`Subscribed to topic: ${TOPIC}`);
    });
  });

  client.on("message", async (topic, message) => {
    try {
      // topic: iot/sensor/sensor-01/temperature
      const parts = topic.split("/");
      const deviceId = parts[2];

      const temperature = parseFloat(message.toString());

      if (isNaN(temperature)) return;

      await SensorReading.create({
        deviceId,
        temperature,
        timestamp: Date.now()
      });

      console.log(`MQTT → Saved reading for ${deviceId}: ${temperature}`);
    } catch (err) {
      console.error("MQTT error:", err.message);
    }
  });
};
