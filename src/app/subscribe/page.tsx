import Image from "next/image";
import Link from "next/link";

export default function Subscribe() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
                src="/logo.png" 
                alt="Slate360" 
                width={200} 
                height={55} 
                className="h-12 w-auto object-contain" 
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Subscribe to Slate360</h1>
        <p className="text-lg text-slate-400 mb-8">Choose your plan and get started.</p>
        {/* Add subscription options here */}
      </div>
    </div>
  );
}