export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary border-b border-muted/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary-foreground">Slate360</a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-primary-foreground">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-4">Creator</h2>
            <p className="text-3xl font-bold mb-4">$79/mo</p>
            <ul className="space-y-2 mb-6">
              <li>✅ Project Hub</li>
              <li>✅ Design Studio</li>
              <li>✅ Content Studio</li>
              <li>✅ 360 Tour Builder</li>
              <li>❌ Geospatial & Robotics</li>
              <li>❌ Virtual Studio</li>
              <li>❌ Analytics & Reports</li>
              <li>❌ Athlete360</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Subscribe</button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-4">Modeling</h2>
            <p className="text-3xl font-bold mb-4">$199/mo</p>
            <ul className="space-y-2 mb-6">
              <li>✅ Project Hub</li>
              <li>✅ Design Studio</li>
              <li>✅ Content Studio</li>
              <li>✅ 360 Tour Builder</li>
              <li>✅ Geospatial & Robotics</li>
              <li>❌ Virtual Studio</li>
              <li>✅ Analytics & Reports</li>
              <li>❌ Athlete360</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Subscribe</button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-4">God Mode</h2>
            <p className="text-3xl font-bold mb-4">$499/mo</p>
            <ul className="space-y-2 mb-6">
              <li>✅ Project Hub</li>
              <li>✅ Design Studio</li>
              <li>✅ Content Studio</li>
              <li>✅ 360 Tour Builder</li>
              <li>✅ Geospatial & Robotics</li>
              <li>✅ Virtual Studio</li>
              <li>✅ Analytics & Reports</li>
              <li>✅ Athlete360</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Subscribe</button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <ul className="space-y-2 mb-6">
              <li>✅ All features</li>
              <li>✅ Custom permissions</li>
              <li>✅ Dedicated support</li>
              <li>✅ White-label options</li>
              <li>✅ API access</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
}