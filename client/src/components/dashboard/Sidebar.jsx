import {
  LayoutDashboard,
  Upload,
  History,
  Briefcase,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upload Resume",
      icon: Upload,
      path: "/upload",
    },
    {
      name: "Resume History",
      icon: History,
      path: "/history",
    },
    {
      name: "Job Matcher",
      icon: Briefcase,
      path: "/job-match",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      name: "Resume Optimizer",
      icon: Sparkles,
      path: "/resume-optimizer",
    },
    {
      name: "Optimized History",
      icon: History,
      path: "/optimized-history",
    },
  ];
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");

      toast.success("Logged Out");

      navigate("/login");
    } catch (err) {
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600">ResumePilot</h1>

      <div className="mt-10 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-xl transition

              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={22} />

              {item.name}
            </Link>
          );
        })}
      </div>
      <button
        onClick={handleLogout}
        className="mt-20 flex items-center gap-3 text-red-500"
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
}
