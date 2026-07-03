import { useEffect, useState } from "react";
import { getMyResumes } from "../api/resumeApi";
import { matchJob } from "../api/jobApi";
import toast from "react-hot-toast";
import JobAnalysis from "../components/job/JobAnalysis";

export default function JobMatcher() {
  const [resumes, setResumes] = useState([]);

  const [resumeId, setResumeId] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState(null);

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

  const handleAnalyze = async () => {
    if (!resumeId) {
      return toast.error("Please select a resume.");
    }

    if (!jobDescription.trim()) {
      return toast.error("Enter a Job Description.");
    }

    try {
      setLoading(true);

      const data = await matchJob(resumeId, jobDescription);

      setAnalysis(data.result);

      toast.success("Analysis Complete");
    } catch (err) {
      console.log(err);

      toast.error("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold">Job Matcher</h1>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <label className="font-semibold">Select Resume</label>

        <select
          className="w-full border p-3 rounded-lg mt-2"
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
        >
          {resumes.map((resume) => (
            <option key={resume._id} value={resume._id}>
              {resume.title}
            </option>
          ))}
        </select>

        <label className="font-semibold mt-6 block">Job Description</label>

        <textarea
          rows={10}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full border rounded-lg mt-2 p-4"
          placeholder="Paste Job Description..."
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </div>

      {analysis && <JobAnalysis analysis={analysis} />}
    </div>
  );
}
