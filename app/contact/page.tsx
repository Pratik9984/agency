import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Start a Project | Contact Stack&Scale",
  description: "Get in touch with the Stack&Scale engineering team. Share your custom website, web application, or IT system requirements to receive a day-by-day milestone delivery roadmap in 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}