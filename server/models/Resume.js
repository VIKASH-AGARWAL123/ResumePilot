import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
    },

    domain: {
      type: String,
      required: [true, "Domain is required"],
      trim: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    aiAnalysis: {
      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      missingSkills: {
        type: [String],
        default: [],
      },

      suggestions: {
        type: [String],
        default: [],
      },

      summary: {
        type: String,
        default: "",
      },

      grammarScore: {
        type: Number,
        default: 0,
      },

      keywordMatch: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
