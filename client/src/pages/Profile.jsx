import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { getMyResumes } from "../api/resumeApi";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profile = await getProfile();
      setUser(profile.user);

      const data = await getMyResumes();
      setResumes(data.resumes);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  const highestATS =
    resumes.length > 0 ? Math.max(...resumes.map((r) => r.atsScore)) : 0;

  const averageATS =
    resumes.length > 0
      ? (
          resumes.reduce((sum, r) => sum + r.atsScore, 0) / resumes.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[700px]">
        <div className="text-center">
          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold mx-auto">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-6">{user.name}</h1>

          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="bg-slate-100 rounded-xl p-5">
            <h3>Total Resumes</h3>

            <h1 className="text-3xl font-bold">{resumes.length}</h1>
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <h3>Highest ATS</h3>

            <h1 className="text-3xl font-bold">{highestATS}</h1>
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <h3>Average ATS</h3>

            <h1 className="text-3xl font-bold">{averageATS}</h1>
          </div>

          <div className="bg-slate-100 rounded-xl p-5">
            <h3>Member Since</h3>

            <h1 className="text-lg font-bold">
              {new Date(user.createdAt).toLocaleDateString()}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
