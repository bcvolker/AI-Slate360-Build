export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-slate-900">Slate360</a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Creator</h2>
            <p className="text-3xl font-bold mb-4 text-blue-600">$79/mo</p>
            <ul className="space-y-2 mb-6 text-slate-600">
              <li>✅ Project Hub</li>
              <li>✅ Design Studio</li>
              <li>✅ Content Studio</li>
              <li>✅ 360 Tour Builder</li>
              <li>❌ Geospatial & Robotics</li>
              <li>❌ Virtual Studio</li>
              <li>❌ Analytics & Reports</li>
              <li>❌ Athlete360</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 transition-all duration-300 hover:scale-105 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Modeling</h2>
            <p className="text-3xl font-bold mb-4 text-blue-600">$199/mo</p>
            <ul className="space-y-2 mb-6 text-slate-600">
              <li>✅ Project Hub</li>
              <li>✅ Design Studio</li>
              <li>✅ Content Studio</li>
              <li>✅ 360 Tour Builder</li>
              <li>✅ Geospatial & Robotics</li>
              <li>❌ Virtual Studio</li>
              <li>✅ Analytics & Reports</li>
              <li>❌ Athlete360</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">God Mode</h2>
            <p className="text-3xl font-bold mb-4 text-blue-600">$499/mo</p>
            <ul className="space-y-2 mb-6 text-slate-600">
              <li>✅ Project Hub</li>
              <li>✅ Design Studio</li>
              <li>✅ Content Studio</li>
              <li>✅ 360 Tour Builder</li>
              <li>✅ Geospatial & Robotics</li>
              <li>✅ Virtual Studio</li>
              <li>✅ Analytics & Reports</li>
              <li>✅ Athlete360</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Enterprise</h2>
            <p className="text-3xl font-bold mb-4 text-blue-600">Custom</p>
            <ul className="space-y-2 mb-6 text-slate-600">
              <li>✅ All features</li>
              <li>✅ Custom permissions</li>
              <li>✅ Dedicated support</li>
              <li>✅ White-label options</li>
              <li>✅ API access</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
}