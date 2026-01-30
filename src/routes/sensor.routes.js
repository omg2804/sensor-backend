import express from "express";
import {
  ingestReading,
  getLatestReading
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.post("/ingest", ingestReading);
router.get("/:deviceId/latest", getLatestReading);

export default router;
