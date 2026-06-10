"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLoaderSync } from '../../useLoaderSync';
import { Project } from '../projectsData';
import Navbar from '../../Navbar';

interface CaseStudyClientProps {
  project: Project;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const animateTrigger = useLoaderSync();

  return (
    <main className="min-h-screen bg-cosmic-black text-stone-900 noise-bg relative tracking-normal selection:bg-blue-500/10 selection:text-blue-900 flex flex-col justify-between">

      {/* ─── AMBIENT GLOW BACKDROP ────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* ─── NAVIGATION HEADER ────────────────────────────── */}
      <Navbar />

      {/* ─── CASE STUDY LAYOUT CONTAINER ─────────────────────── */}
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full relative z-10">
        <Link href="/#portfolio" className="text-xs font-semibold text-stone-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1 mb-8">
          &larr; Back to Selected Work
        </Link>

        {/* Hero Banner Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 text-left">
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={animateTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-blue-600 font-mono text-[10px] uppercase tracking-widest font-semibold">{project.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono text-amber-600 uppercase font-medium bg-amber-500/5 px-2.5 py-0.5 rounded border border-amber-500/10">Prototype / Under Active Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight leading-[1.12] text-stone-900 font-heading">
              {project.title}
            </h1>
            <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-stone-600 mt-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-700 font-medium">
                  {t}
                </span>
              ))}
            </div>
            {project.liveUrl && (
              <div className="mt-2">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-widest px-5 py-3 rounded-xl cursor-pointer shadow-md transition-colors w-fit"
                >
                  View Live Website
                  <svg className="w-3.5 h-3.5 stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="lg:col-span-6 w-full aspect-[16/10] bg-stone-50 border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center shrink-0 relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={animateTrigger ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {project.mockup}
          </motion.div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start text-left pt-8 border-t border-stone-200/60">
          {/* Left Column: Challenge & Solution */}
          <div className="lg:col-span-7 space-y-10">
            {/* Prototype Banner */}
            <motion.div
              className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-4 text-left shadow-[0_4px_20px_rgba(245,158,11,0.02)]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                ⚠️
              </div>
              <div className="text-xs font-light text-stone-600 leading-relaxed">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-stone-900 block mb-0.5">Development Status: Prototype Deliverable</span>
                This system represents a high-fidelity design and interface prototype delivered to the client for validation. Our engineering team is currently developing the backend integrations and full-scale system architecture.
              </div>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-lg font-bold font-heading text-stone-900 uppercase tracking-wide">Project Scope & Subtitle</h2>
              <p className="text-stone-600 text-sm font-semibold">{project.subtitle}</p>
            </motion.div>

            {/* Prototype Specs Grid */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-[10px] uppercase tracking-wider font-mono text-blue-600 font-bold block">Prototype Design Specs</span>
              <div className="grid grid-cols-2 gap-4">
                {project.specs.map((spec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-[inset_0_1px_1px_rgba(0,0,0,0.01)] hover:border-blue-500/10 transition-all">
                    <p className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mb-1">{spec.label}</p>
                    <p className="text-sm font-bold text-stone-900 font-mono">{spec.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Challenge Card */}
            <motion.div 
              className="p-6 rounded-2xl bg-white border border-stone-200/80 flex flex-col gap-2 relative overflow-hidden text-left"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/80" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1 font-mono">The Technical Challenge</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">{project.challenge}</p>
            </motion.div>

            {/* Solution Card */}
            <motion.div 
              className="p-6 rounded-2xl bg-white border border-stone-200/80 flex flex-col gap-2 relative overflow-hidden text-left"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/80" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1 font-mono">The Applied Solution</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">{project.solution}</p>
            </motion.div>
          </div>

          {/* Right Column: Sequence Blueprint */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24">
            {/* Sequence Blueprints Timeline */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-[10px] uppercase tracking-wider font-mono text-blue-600 font-bold block">System Sequence Blueprint</span>
              <div className="space-y-5">
                {project.blueprint.map((b, idx) => (
                  <div key={idx} className="flex gap-4 items-start text-stone-750">
                    <div className="w-6 h-6 rounded bg-stone-100 border border-stone-200 text-blue-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      0{idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-stone-900 leading-snug">{b.step}</p>
                      <p className="text-stone-500 text-xs font-light mt-1 leading-relaxed">{b.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Intake CTA Card */}
        <motion.div 
          className="mt-20 p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 text-center relative overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.02),transparent_70%)] pointer-events-none" />
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-stone-900 mb-4 font-heading">
            Need a high-performance system for your business?
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm font-light max-w-md mx-auto mb-8 leading-relaxed">
            Let&apos;s design and deploy custom, speed-optimized software tailored perfectly to your requirements and operations.
          </p>
          <Link href="/contact">
            <motion.button 
              className="bg-stone-900 text-stone-50 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-stone-850 mx-auto" 
              whileTap={{ scale: 0.98 }}
            >
              Initiate Project Intake
              <svg className="w-4.5 h-4.5 stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-stone-955 text-stone-450 border-t border-stone-900/80 py-10 shrink-0 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-[10px] font-medium tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-stone-900 border border-stone-800 flex items-center justify-center relative overflow-hidden">
              <img src="/icon.png" alt="Stack & Scale Footer Logo" className="w-4.5 h-4.5 object-contain" />
            </div>
            <span className="font-semibold text-xs text-white font-heading tracking-tight">Stack<span className="text-stone-400 font-light">&Scale</span></span>
          </div>
          <span className="font-normal text-stone-500 normal-case text-center">© {new Date().getFullYear()} Stack&Scale. Custom business websites and IT solutions.</span>
          <div className="flex items-center gap-6 text-stone-500">
            <a href="mailto:hello.stackandscale@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://wa.me/918421526195" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="https://www.instagram.com/stack__and__scale" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
