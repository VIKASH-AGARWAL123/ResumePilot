import { FileText, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResumeCard({ resume }) {
  if (!resume) {
    return (
      <div className="bg-white rounded-2xl shadow-md mt-8 p-10 text-center">
        <FileText size={70} className="mx-auto text-gray-300" />

        <h2 className="text-2xl font-bold mt-6">No Resume Uploaded</h2>

        <p className="text-gray-500 mt-2">
          Upload your resume to receive an AI-powered ATS analysis.
        </p>
      </div>
    );
  }
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md mt-8 p-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Latest Resume</h2>

          <p className="text-xl mt-5 font-semibold">{resume.title}</p>

          <p className="text-gray-500 mt-2">{resume.domain}</p>

          <p className="text-gray-500 mt-2">
            Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate("/view-resume", {
                state: {
                  pdfUrl: resume.pdfUrl,
                },
              })
            }
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            <Eye size={20} />
          </button>

          <button className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="font-bold text-lg">AI Summary</h3>

      <p className="text-gray-600 mt-3 leading-7">
        {resume.aiAnalysis.summary}
      </p>
    </div>
  );
}
