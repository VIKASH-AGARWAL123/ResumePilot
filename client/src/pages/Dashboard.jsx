import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import StatCard from "../components/dashboard/StatCard";
import ResumeCard from "../components/dashboard/ResumeCard";

import { Target, CheckCircle, FileText } from "lucide-react";

import { getMyResumes } from "../api/resumeApi";

export default function Dashboard() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResume = async () => {
    try {
      const data = await getMyResumes();

      if (data.resumes && data.resumes.length > 0) {
        setResume(data.resumes[0]);
      } else {
        setResume(null);
      }
    } catch (error) {
      console.log(error);
      setResume(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <Header />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatCard
            title="ATS Score"
            value={resume ? resume.atsScore : "--"}
            color="bg-blue-600"
            icon={Target}
          />

          <StatCard
            title="Grammar Score"
            value={resume ? `${resume.aiAnalysis.grammarScore}%` : "--"}
            color="bg-green-600"
            icon={CheckCircle}
          />

          <StatCard
            title="Keyword Match"
            value={resume ? `${resume.aiAnalysis.keywordMatch}%` : "--"}
            color="bg-purple-600"
            icon={FileText}
          />
        </div>

        {/* Latest Resume */}
        <div className="mt-8">
          <ResumeCard resume={resume} />
        </div>
      </div>
    </div>
  );
}
