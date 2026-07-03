import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById } from "../api/resumeApi";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function ResumeDetails() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await getResumeById(id);

      setResume(data.resume);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-5">
          <Document
            file={resume.pdfUrl}
            onLoadSuccess={({ numPages }) => setPages(numPages)}
          >
            {Array.from(new Array(pages), (_, index) => (
              <Page key={index} pageNumber={index + 1} className="mb-5" />
            ))}
          </Document>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h1 className="text-3xl font-bold">{resume.title}</h1>

            <p className="text-gray-500">{resume.domain}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-600 rounded-xl p-5 text-white">
              <h2>ATS</h2>

              <h1 className="text-4xl font-bold">{resume.atsScore}</h1>
            </div>

            <div className="bg-green-600 rounded-xl p-5 text-white">
              <h2>Grammar</h2>

              <h1 className="text-4xl font-bold">
                {resume.aiAnalysis.grammarScore}
              </h1>
            </div>

            <div className="bg-purple-600 rounded-xl p-5 text-white">
              <h2>Keywords</h2>

              <h1 className="text-4xl font-bold">
                {resume.aiAnalysis.keywordMatch}
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">Summary</h2>

            <p className="mt-3">{resume.aiAnalysis.summary}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">Strengths</h2>

            <ul className="list-disc ml-5 mt-3">
              {resume.aiAnalysis.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">Weaknesses</h2>

            <ul className="list-disc ml-5 mt-3">
              {resume.aiAnalysis.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">Missing Skills</h2>

            <ul className="list-disc ml-5 mt-3">
              {resume.aiAnalysis.missingSkills.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">Suggestions</h2>

            <ul className="list-disc ml-5 mt-3">
              {resume.aiAnalysis.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
