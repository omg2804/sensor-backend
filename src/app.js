import express from "express";
import cors from "cors";
import sensorRoutes from "./routes/sensor.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sensor", sensorRoutes);

app.get("/", (req, res) => {
  res.send("Sensor API is running");
});

export default app;
