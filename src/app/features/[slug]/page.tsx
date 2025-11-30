import { notFound } from 'next/navigation';
import { learnPages } from '@/lib/learnPages';
import { LearnLayout } from '@/components/learn/LearnLayout';

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = learnPages[slug as keyof typeof learnPages];

  if (!page) {
    notFound();
  }

  return <LearnLayout page={page} />;
}