import { useEffect, useState } from "react";
import { getMyResumes } from "../api/resumeApi";
import { optimizeResume } from "../api/optimizerApi";
import toast from "react-hot-toast";
import OptimizerResult from "../components/optimizer/OptimizerResult";

export default function ResumeOptimizer() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [targetRole, setTargetRole] = useState("Backend Developer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await getMyResumes();

      setResumes(data.resumes);

      if (data.resumes.length > 0) {
        setResumeId(data.resumes[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptimize = async () => {
    if (!resumeId) {
      return toast.error("Select a Resume");
    }

    try {
      setLoading(true);

      const data = await optimizeResume(
        resumeId,
        targetRole
      );

      setResult(data.optimizedResume);

      toast.success("Resume Optimized");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Optimization Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold">
        Resume Optimizer
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mt-8">

        <label className="font-semibold">
          Select Resume
        </label>

        <select
          className="w-full border p-3 rounded-lg mt-2"
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
        >
          {resumes.map((resume) => (
            <option
              key={resume._id}
              value={resume._id}
            >
              {resume.title}
            </option>
          ))}
        </select>

        <label className="font-semibold block mt-6">
          Target Role
        </label>

        <select
          value={targetRole}
          onChange={(e) =>
            setTargetRole(e.target.value)
          }
          className="w-full border p-3 rounded-lg mt-2"
        >
          <option>Backend Developer</option>
          <option>Frontend Developer</option>
          <option>Full Stack Developer</option>
          <option>Java Developer</option>
          <option>Python Developer</option>
          <option>Data Scientist</option>
          <option>DevOps Engineer</option>
        </select>

        <button
          onClick={handleOptimize}
          disabled={loading}
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          {loading
            ? "Optimizing..."
            : "Optimize Resume"}
        </button>

      </div>

      {result && (
        <OptimizerResult result={result} />
      )}

    </div>
  );
}