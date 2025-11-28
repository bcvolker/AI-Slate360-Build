export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Active Projects</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Storage Used</h3>
          <p className="text-3xl font-bold">450 GB</p>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Team Members</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
      </div>
    </div>
  )
}
