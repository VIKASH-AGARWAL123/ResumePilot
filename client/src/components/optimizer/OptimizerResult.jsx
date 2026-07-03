export default function OptimizerResult({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-3xl font-bold mb-6">✨ Optimized Resume</h2>

      {/* Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3">Professional Summary</h3>
        <p className="text-gray-700 leading-7">{result.summary}</p>
      </div>

      {/* Skills & Keywords */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">Skills</h3>

          <ul className="list-disc ml-5 space-y-2">
            {result.skills?.map((skill, index) => (
              <li key={index}>
                {typeof skill === "string"
                  ? skill
                  : skill.name || JSON.stringify(skill)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">ATS Keywords</h3>

          <ul className="list-disc ml-5 space-y-2">
            {result.keywords?.map((keyword, index) => (
              <li key={index}>
                {typeof keyword === "string"
                  ? keyword
                  : keyword.name || JSON.stringify(keyword)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Projects */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-3">
          Improved Project Descriptions
        </h3>

        <div className="space-y-5">
          {result.projects?.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              {typeof project === "string" ? (
                <p>{project}</p>
              ) : (
                <>
                  <h4 className="font-bold text-lg">{project.title}</h4>

                  <p className="mt-2 text-gray-700">{project.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-3">Resume Improvement Tips</h3>

        <ul className="list-disc ml-5 space-y-2">
          {result.tips?.map((tip, index) => (
            <li key={index}>
              {typeof tip === "string"
                ? tip
                : tip.description || tip.title || JSON.stringify(tip)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
