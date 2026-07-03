import Resume from "../models/Resume.js";
import { optimizeResume } from "../services/resumeOptimizerService.js";
import OptimizedResume from "../models/OptimizedResume.js";

export const optimizeResumeController = async (req, res) => {
  try {
    const { resumeId, targetRole } = req.body;

    if (!resumeId || !targetRole) {
      return res.status(400).json({
        success: false,
        message: "Resume ID and Target Role are required.",
      });
    }

    // Find the user's resume
    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    // Optimize using Gemini
    const optimizedResume = await optimizeResume(
      resume.extractedText,
      targetRole,
    );
    const savedResume = await OptimizedResume.create({
      resume: resume._id,
      user: req.user._id,
      targetRole,

      summary: optimizedResume.summary,
      skills: optimizedResume.skills,
      keywords: optimizedResume.keywords,
      projects: optimizedResume.projects,
      tips: optimizedResume.tips,
    });

    return res.status(200).json({
      success: true,
      message: "Resume optimized successfully.",
      optimizedResume: savedResume,
    });
  } catch (error) {
    console.error(error);

    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message: "Gemini AI is busy. Please try again in a few moments.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOptimizedResumes = async (req, res) => {
  try {
    const optimizedResumes = await OptimizedResume.find({
      user: req.user._id,
    })
      .populate("resume", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: optimizedResumes.length,
      optimizedResumes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getOptimizedResumeById = async (req, res) => {
  try {
    const optimizedResume = await OptimizedResume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!optimizedResume) {
      return res.status(404).json({
        success: false,
        message: "Optimized resume not found.",
      });
    }

    return res.status(200).json({
      success: true,
      optimizedResume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteOptimizedResume = async (req, res) => {
  try {
    const optimizedResume = await OptimizedResume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!optimizedResume) {
      return res.status(404).json({
        success: false,
        message: "Optimized resume not found.",
      });
    }

    await optimizedResume.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Optimized resume deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateOptimizedResume = async (req, res) => {
  try {
    const optimizedResume = await OptimizedResume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!optimizedResume) {
      return res.status(404).json({
        success: false,
        message: "Optimized Resume not found.",
      });
    }

    const { summary, skills, keywords, projects, tips } = req.body;

    optimizedResume.summary = summary;
    optimizedResume.skills = skills;
    optimizedResume.keywords = keywords;
    optimizedResume.projects = projects;
    optimizedResume.tips = tips;

    await optimizedResume.save();

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully.",
      optimizedResume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};