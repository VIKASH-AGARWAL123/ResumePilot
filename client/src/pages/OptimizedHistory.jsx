import { useEffect, useState } from "react";
import { getOptimizedResumes } from "../api/optimizedResumeApi";
import OptimizedResumeCard from "../components/optimizer/OptimizedResumeCard";

export default function OptimizedHistory() {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = async () => {
    try {
      const data = await getOptimizedResumes();
      setResumes(data.optimizedResumes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold">Optimized Resume History</h1>

      <div className="mt-8 space-y-5">
        {resumes.map((resume) => (
          <OptimizedResumeCard
            key={resume._id}
            resume={resume}
            fetchResumes={fetchResumes}
          />
        ))}
      </div>
    </div>
  );
}
