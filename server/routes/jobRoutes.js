import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { matchJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/match", protect, matchJob);

export default router;
