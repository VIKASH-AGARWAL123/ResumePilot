import Resume from "../models/Resume.js";
import { analyzeJobMatch } from "../services/jobMatcherService.js";

export const matchJob = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume ID and Job Description are required.",
      });
    }

    // Find resume of logged-in user
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

    // Analyze using Gemini
    const result = await analyzeJobMatch(resume.extractedText, jobDescription);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
