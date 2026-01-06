export default function UserDashboardView({ user }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'User'}! 👋</h1>
        <p className="text-gray-500 mt-2">Here is your project overview.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder Stats Cards */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-700">Active Projects</h3>
          <p className="text-3xl font-bold text-blue-900 mt-2">3</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h3 className="font-semibold text-green-700">Completed</h3>
          <p className="text-3xl font-bold text-green-900 mt-2">12</p>
        </div>
      </div>
    </div>
  );
}