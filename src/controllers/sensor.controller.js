import SensorReading from "../models/SensorReading.js";

/**
 * POST /api/sensor/ingest
 */
export const ingestReading = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    if (!deviceId || temperature === undefined) {
      return res
        .status(400)
        .json({ error: "deviceId and temperature are required" });
    }

    const reading = await SensorReading.create({
      deviceId,
      temperature,
      timestamp: timestamp || Date.now()
    });

    res.status(201).json({
      success: true,
      data: reading
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /api/sensor/:deviceId/latest
 */
export const getLatestReading = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const latest = await SensorReading
      .findOne({ deviceId })
      .sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ error: "No data found for device" });
    }

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
