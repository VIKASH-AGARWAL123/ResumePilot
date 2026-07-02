import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.send("ResumePilot API is running...");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

export default app;
