import { portfolioProjects } from '../projectsData';
import CaseStudyClient from './CaseStudyClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = portfolioProjects.find(p => p.slug === id || String(p.id) === id);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
