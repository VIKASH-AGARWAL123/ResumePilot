import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

import {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);

router.get("/my-resumes", protect, getMyResumes);

router.get("/:id", protect, getResumeById);

router.delete("/:id", protect, deleteResume);

export default router;
