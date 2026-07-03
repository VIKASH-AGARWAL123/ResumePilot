export default function StatCard({ title, value, color, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>

          <h1 className="text-4xl font-bold mt-3">{value}</h1>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={30} className="text-white" />
        </div>
      </div>
    </div>
  );
}
