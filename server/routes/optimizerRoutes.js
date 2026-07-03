import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  optimizeResumeController,
  getOptimizedResumes,
  getOptimizedResumeById,
  deleteOptimizedResume,
  updateOptimizedResume,
} from "../controllers/optimizerController.js";

const router = express.Router();

router.post("/optimize", protect, optimizeResumeController);

router.get("/", protect, getOptimizedResumes);

router.get("/:id", protect, getOptimizedResumeById);

router.put("/:id", protect, updateOptimizedResume);

router.delete("/:id", protect, deleteOptimizedResume);

export default router;
