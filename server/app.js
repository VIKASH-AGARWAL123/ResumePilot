import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import resumeRoutes from "./routes/resumeRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import optimizerRoutes from "./routes/optimizerRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.send("ResumePilot API is running...");
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/optimizer", optimizerRoutes);

export default app;
