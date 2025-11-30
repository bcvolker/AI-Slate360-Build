import { notFound } from 'next/navigation';
import Image from "next/image";

const features = {
  'design-studio': {
    title: 'Design Studio',
    description: 'Interactive 3D visualization for CAD, BIM, and photogrammetry models.',
  },
  'project-hub': {
    title: 'Project Hub',
    description: 'Centralized command for real-time mission data synchronization.',
  },
  'content-studio': {
    title: 'Content Studio',
    description: 'AI-powered content creation and editing tools.',
  },
  '360-tour-builder': {
    title: '360 Tour Builder',
    description: 'Drag-and-drop creation of interactive 360-degree tours.',
  },
  'geospatial-robotics': {
    title: 'Geospatial & Robotics',
    description: 'Live tracking of assets, missions, and robotics with AI insights.',
  },
  'virtual-studio': {
    title: 'Virtual Studio',
    description: 'Full VR immersion with haptic feedback for sites and designs.',
  },
  'reports-analytics': {
    title: 'Reports & Analytics',
    description: 'Comprehensive reporting and analytics for project performance.',
  },
};

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = features[slug as keyof typeof features];

  if (!feature) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image 
                src="/logo.png" 
                alt="Slate360" 
                width={200} 
                height={55} 
                className="h-12 w-auto object-contain" 
            />
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-slate-400 hover:text-white transition-colors">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-white">{feature.title}</h1>
        <p className="text-lg text-slate-400 mb-8">{feature.description}</p>
        <p className="text-slate-500">More details coming soon...</p>
      </div>
    </div>
  );
}