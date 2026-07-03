import mongoose from "mongoose";

const optimizedResumeSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetRole: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    keywords: [
      {
        type: String,
      },
    ],

    projects: [
      {
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],

    tips: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const OptimizedResume = mongoose.model(
  "OptimizedResume",
  optimizedResumeSchema,
);

export default OptimizedResume;
