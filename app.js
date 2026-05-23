import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

// HEALTH API

app.get("/api/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    serverTime: new Date().toISOString(),
    uptime: process.uptime(),
  });

});

// ROUTES

app.use("/api", notificationRoutes);

// DATABASE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// SERVER

app.listen(5000, () => {
  console.log("Server Running");
});