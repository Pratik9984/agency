import { portfolioProjects } from '../projectsData';
import CaseStudyClient from './CaseStudyClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioProjects.find(p => p.slug === id || String(p.id) === id);
  
  if (!project) {
    return {
      title: "Project Not Found | Stack&Scale",
    };
  }

  return {
    title: `${project.title} Case Study | Stack&Scale`,
    description: project.desc,
    alternates: {
      canonical: `https://stackandscale.in/work/${project.slug}`,
    },
    openGraph: {
      url: `https://stackandscale.in/work/${project.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = portfolioProjects.find(p => p.slug === id || String(p.id) === id);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
