import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteOptimizedResume } from "../../api/optimizedResumeApi";
import toast from "react-hot-toast";

export default function OptimizedResumeCard({
  resume,
  fetchResumes,
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Delete this version?")) return;

    try {
      await deleteOptimizedResume(resume._id);

      toast.success("Version deleted");

      fetchResumes();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between">

      <div>

        <h2 className="text-2xl font-bold">
          {resume.targetRole}
        </h2>

        <p className="text-gray-500 mt-2">
          {resume.resume?.title}
        </p>

        <p className="text-gray-500">
          {new Date(resume.createdAt).toLocaleString()}
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={() =>
            navigate(`/optimized/${resume._id}`)
          }
          className="bg-blue-600 text-white p-3 rounded-lg"
        >
          <Eye />
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white p-3 rounded-lg"
        >
          <Trash2 />
        </button>

      </div>

    </div>
  );
}