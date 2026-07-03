export default function Header() {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-500 mt-2">
          Here's your latest AI resume analysis.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          V
        </div>

        <div>
          <h2 className="font-semibold">Vikash</h2>

          <p className="text-sm text-gray-500">Backend Developer</p>
        </div>
      </div>
    </div>
  );
}
