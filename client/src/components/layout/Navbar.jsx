import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl text-blue-600"
        >
          <BrainCircuit size={34} />
          ResumePilot
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features">Features</a>

          <a href="#how">How it Works</a>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
