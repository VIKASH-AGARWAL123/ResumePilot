export default function JobAnalysis({ analysis }) {
  return (
    <div className="bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-3xl font-bold">Match Score</h2>

      <div className="text-6xl text-blue-600 font-bold mt-4">
        {analysis.matchScore}%
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Summary</h3>

        <p className="mt-3">{analysis.summary}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <div>
          <h3 className="font-bold text-xl">Strengths</h3>

          <ul className="list-disc ml-5 mt-3">
            {analysis.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl">Missing Skills</h3>

          <ul className="list-disc ml-5 mt-3">
            {analysis.missingSkills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl">Suggestions</h3>

          <ul className="list-disc ml-5 mt-3">
            {analysis.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
