export default function AdminDashboardView({ user }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">Admin Command Center 🛡️</h1>
                <p className="text-gray-400 mt-2">System Status: Operational</p>
            </div>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">SUPER ADMIN</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Admin Specific Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm uppercase">Total Users</h3>
            <p className="text-3xl font-bold mt-2">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm uppercase">Revenue (Mo)</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">$45.2k</p>
        </div>
      </div>
    </div>
  );
}