import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Start a Project | Contact Stack&Scale",
  description: "Talk to the Stack&Scale team about your next custom web project.",
  alternates: {
    canonical: "https://stackandscale.in/contact",
  },
  openGraph: {
    title: "Start a Project | Contact Stack&Scale",
    description: "Talk to the Stack&Scale team about your next custom web project.",
    url: "https://stackandscale.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}