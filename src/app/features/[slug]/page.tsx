import { notFound } from 'next/navigation';

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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{feature.title}</h1>
      <p className="text-lg text-slate-600 mb-8">{feature.description}</p>
      <p>More details coming soon...</p>
    </div>
  );
}