import { useEffect, useState } from "react";
import { getMyResumes } from "../api/resumeApi";
import ResumeHistoryCard from "../components/history/ResumeHistoryCard";

export default function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      setLoading(true);

      const data = await getMyResumes();

      setResumes(data.resumes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold">Resume History</h1>

      <p className="text-gray-500 mt-2">All uploaded resumes</p>

      <div className="grid gap-6 mt-8">
        {resumes.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">No Resume Found</h2>
          </div>
        ) : (
          resumes.map((resume) => (
            <ResumeHistoryCard
              key={resume._id}
              resume={resume}
              fetchResumes={fetchResumes}
            />
          ))
        )}
      </div>
    </div>
  );
}
