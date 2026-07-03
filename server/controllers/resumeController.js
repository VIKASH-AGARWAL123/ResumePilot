import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../services/pdfService.js";
import { analyzeResume } from "../services/aiService.js";

export const uploadResume = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF.",
      });
    }

    // Upload PDF to Cloudinary
    const uploadedFile = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ResumePilot",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.buffer);

    // Analyze resume using Gemini AI
    const aiAnalysis = await analyzeResume(
      extractedText,
      req.body.domain || "General",
    );

    // Temporary User ID
    const userId = req.user._id;

    // Save to MongoDB
    const resume = await Resume.create({
      user: userId,
      title: req.file.originalname,
      domain: req.body.domain || "General",

      pdfUrl: uploadedFile.secure_url,
      publicId: uploadedFile.public_id,

      extractedText,

      atsScore: aiAnalysis.atsScore,

      aiAnalysis: {
        summary: aiAnalysis.summary,
        strengths: aiAnalysis.strengths,
        weaknesses: aiAnalysis.weaknesses,
        missingSkills: aiAnalysis.missingSkills,
        suggestions: aiAnalysis.suggestions,
        grammarScore: aiAnalysis.grammarScore,
        keywordMatch: aiAnalysis.keywordMatch,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully.",
      resume,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get all resumes of logged-in user
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one resume
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    // Delete from MongoDB
    await resume.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
