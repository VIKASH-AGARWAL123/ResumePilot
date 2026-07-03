import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteResume } from "../../api/resumeApi";
import toast from "react-hot-toast";

export default function ResumeHistoryCard({ resume,fe }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(resume._id);

      toast.success("Resume deleted successfully");

      fetchResumes();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{resume.title}</h2>

        <p className="text-gray-500 mt-2">{resume.domain}</p>

        <p className="text-gray-500">ATS Score : {resume.atsScore}</p>

        <p className="text-gray-500">
          {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/resume/${resume._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
        >
          <Eye />
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
