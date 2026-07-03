import {
  Brain,
  FileText,
  BadgeCheck,
  Target,
  Cloud,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "AI Analysis",
    icon: Brain,
    desc: "Gemini analyzes your resume professionally.",
  },
  {
    title: "ATS Score",
    icon: BadgeCheck,
    desc: "Know whether your resume passes ATS.",
  },
  {
    title: "Resume Upload",
    icon: FileText,
    desc: "Upload PDF resumes instantly.",
  },
  {
    title: "Job Match",
    icon: Target,
    desc: "Compare resume with job description.",
  },
  {
    title: "Cloud Storage",
    icon: Cloud,
    desc: "Cloudinary stores resumes securely.",
  },
  {
    title: "AI Chat",
    icon: MessageCircle,
    desc: "Ask questions about your resume.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">Everything You Need</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
              >
                <Icon size={45} className="text-blue-600" />

                <h3 className="mt-5 text-2xl font-semibold">{feature.title}</h3>

                <p className="mt-4 text-gray-500">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
