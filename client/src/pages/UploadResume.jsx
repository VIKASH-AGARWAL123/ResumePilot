import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [domain, setDomain] = useState("Backend Developer");
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);
      formData.append("domain", domain);

      const token = localStorage.getItem("token");

      await API.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume Uploaded Successfully");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white w-[700px] rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold">Upload Resume</h1>

        <p className="text-gray-500 mt-2">
          Upload your resume for AI analysis.
        </p>

        <div
          {...getRootProps()}
          className="mt-8 border-2 border-dashed border-blue-400 rounded-xl p-12 text-center cursor-pointer"
        >
          <input {...getInputProps()} />

          <UploadCloud size={60} className="mx-auto text-blue-600" />

          <h2 className="mt-5 text-xl">Drag & Drop Resume Here</h2>

          <p className="text-gray-500 mt-2">or Click to Browse</p>

          {file && (
            <p className="mt-6 text-green-600 font-semibold">{file.name}</p>
          )}
        </div>

        <div className="mt-8">
          <label className="font-semibold">Target Domain</label>

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full mt-3 border rounded-lg p-3"
          >
            <option>Backend Developer</option>
            <option>Frontend Developer</option>
            <option>Full Stack Developer</option>
            <option>Java Developer</option>
            <option>MERN Stack Developer</option>
            <option>Python Developer</option>
            <option>Data Scientist</option>
            <option>DevOps Engineer</option>
          </select>
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl w-full"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
}
