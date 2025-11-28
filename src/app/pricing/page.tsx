export default function Pricing() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4">Creator</h2>
          <p className="text-3xl font-bold mb-4">$79/mo</p>
          <ul className="space-y-2 mb-6">
            <li>Content Studio</li>
            <li>360 Tour Builder</li>
            <li>Basic Analytics</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Subscribe</button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4">Modeling</h2>
          <p className="text-3xl font-bold mb-4">$199/mo</p>
          <ul className="space-y-2 mb-6">
            <li>All Creator features</li>
            <li>Design Studio</li>
            <li>Geospatial & Robotics</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Subscribe</button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4">God Mode</h2>
          <p className="text-3xl font-bold mb-4">$499/mo</p>
          <ul className="space-y-2 mb-6">
            <li>All Modeling features</li>
            <li>Virtual Studio</li>
            <li>Full Procore Integration</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Subscribe</button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
          <p className="text-3xl font-bold mb-4">Custom</p>
          <ul className="space-y-2 mb-6">
            <li>All features</li>
            <li>Custom permissions</li>
            <li>Dedicated support</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}