import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import PDFViewer from "./pages/PDFViewer";
import ResumeHistory from "./pages/ResumeHistory";
import ResumeDetails from "./pages/ResumeDetails";
import Profile from "./pages/Profile";
import JobMatcher from "./pages/JobMatcher";
import ResumeOptimizer from "./pages/ResumeOptimizer";
import OptimizedHistory from "./pages/OptimizedHistory";
import OptimizedResumeEditor from "./pages/OptimizedResumeEditor";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/view-resume" element={<PDFViewer />} />
        <Route path="/history" element={<ResumeHistory />} />
        <Route path="/resume/:id" element={<ResumeDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-match" element={<JobMatcher />} />
        <Route path="/resume-optimizer" element={<ResumeOptimizer />} />
        <Route path="/optimized-history" element={<OptimizedHistory />} />
        <Route path="/optimized/:id" element={<OptimizedResumeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
