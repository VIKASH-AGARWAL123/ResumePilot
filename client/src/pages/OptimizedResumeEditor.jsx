import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOptimizedResume,
  updateOptimizedResume,
} from "../api/optimizedResumeApi";
import { downloadResumePDF } from "../utils/downloadResume";

import toast from "react-hot-toast";

export default function OptimizedResumeEditor() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState({
    summary: "",
    skills: [],
    keywords: [],
    projects: [],
    tips: [],
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const data = await getOptimizedResume(id);

      setResume(data.optimizedResume);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load resume");
    } finally {
      setLoading(false);
    }
  };
  const handleSkillChange = (index, value) => {
    const updated = [...resume.skills];
    updated[index] = value;

    setResume({
      ...resume,
      skills: updated,
    });
  };

  const addSkill = () => {
    setResume({
      ...resume,
      skills: [...resume.skills, ""],
    });
  };

  const removeSkill = (index) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    });
  };

  const handleKeywordChange = (index, value) => {
    const updated = [...resume.keywords];

    updated[index] = value;

    setResume({
      ...resume,
      keywords: updated,
    });
  };

  const addKeyword = () => {
    setResume({
      ...resume,
      keywords: [...resume.keywords, ""],
    });
  };

  const removeKeyword = (index) => {
    setResume({
      ...resume,
      keywords: resume.keywords.filter((_, i) => i !== index),
    });
  };
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resume.projects];

    updatedProjects[index][field] = value;

    setResume({
      ...resume,
      projects: updatedProjects,
    });
  };

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          title: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    setResume({
      ...resume,
      projects: resume.projects.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      await updateOptimizedResume(id, resume);

      toast.success("Resume Updated");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Resume Editor</h1>

      {/* Summary */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Professional Summary</h2>

        <textarea
          rows={8}
          value={resume.summary}
          onChange={(e) =>
            setResume({
              ...resume,
              summary: e.target.value,
            })
          }
          className="w-full border rounded-lg p-4"
        />
      </div>

      {/* Skills */}

      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Skills</h2>

          <button
            onClick={addSkill}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Skill
          </button>
        </div>

        {resume.skills.map((skill, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="flex-1 border rounded-lg p-3"
            />

            <button
              onClick={() => removeSkill(index)}
              className="bg-red-500 text-white px-3 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Keywords */}

      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Keywords</h2>

          <button
            onClick={addKeyword}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Keyword
          </button>
        </div>

        {resume.keywords.map((keyword, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              value={keyword}
              onChange={(e) => handleKeywordChange(index, e.target.value)}
              className="flex-1 border rounded-lg p-3"
            />

            <button
              onClick={() => removeKeyword(index)}
              className="bg-red-500 text-white px-3 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Projects</h2>

          <button
            onClick={addProject}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        </div>

        {resume.projects.map((project, index) => (
          <div key={index} className="border rounded-xl p-5 mt-5">
            <input
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <textarea
              rows={5}
              value={project.description}
              onChange={(e) =>
                handleProjectChange(index, "description", e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={() => removeProject(index)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Project
            </button>
          </div>
        ))}
      </div>

      {/* Tips */}

      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Resume Tips</h2>

        <textarea
          rows={6}
          value={resume.tips.join("\n")}
          onChange={(e) =>
            setResume({
              ...resume,
              tips: e.target.value.split("\n").map((t) => t.trim()),
            })
          }
          className="w-full border rounded-lg p-4"
        />
      </div>
      <div className="flex gap-4 mt-10">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          Save Changes
        </button>

        <button
          onClick={() => downloadResumePDF(resume)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
