export default function HowItWorks() {
  const steps = [
    "Upload Resume",
    "Extract Text",
    "Gemini AI Analysis",
    "Get ATS Score",
  ];

  return (
    <section id="how" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-blue-50 rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-5">
                {index + 1}
              </div>

              <h3 className="font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
