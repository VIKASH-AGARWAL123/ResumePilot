import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            AI Powered Resume Analyzer
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight">
            Build a Resume
            <span className="text-blue-600">Recruiters Love</span>
          </h1>

          <p className="mt-8 text-gray-600 text-lg leading-8">
            Upload your resume and receive instant ATS scoring, AI feedback,
            grammar analysis, missing skills, and personalized suggestions
            powered by Gemini AI.
          </p>

          <div className="mt-10 flex gap-5">
            <Link
              to="/signup"
              className="bg-blue-600 px-8 py-4 rounded-xl text-white font-semibold"
            >
              Get Started
            </Link>

            <a href="#features" className="border px-8 py-4 rounded-xl">
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
