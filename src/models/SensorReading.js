import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  temperature: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

sensorSchema.index({ deviceId: 1, timestamp: -1 });

export default mongoose.model("SensorReading", sensorSchema);
