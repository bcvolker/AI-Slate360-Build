"use client";

export default function LiveMap() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-lg font-semibold">Interactive Map</p>
        <p className="text-sm opacity-90">Live geospatial data</p>
      </div>
    </div>
  );
}
