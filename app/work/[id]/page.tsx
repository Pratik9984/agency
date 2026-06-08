"use client";

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderSync } from '../../useLoaderSync';
import { portfolioProjects } from '../projectsData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CaseStudyPage({ params }: PageProps) {
  const { id } = use(params);
  const animateTrigger = useLoaderSync();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const project = portfolioProjects.find(p => p.slug === id || String(p.id) === id);

  // Scroll Lock implementation for mobile nav
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cosmic-black text-stone-900 px-6 text-center">
        <h1 className="text-2xl font-bold font-heading mb-4">Case Study Not Found</h1>
        <p className="text-stone-600 mb-8 max-w-sm">The case study you are looking for does not exist or has been relocated.</p>
        <Link href="/">
          <motion.button className="bg-stone-900 text-stone-50 font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl cursor-pointer hover:bg-stone-850 shadow-md transition-all">
            Return to Homepage
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cosmic-black text-stone-900 noise-bg relative tracking-normal selection:bg-blue-500/10 selection:text-blue-900 flex flex-col justify-between">
      {/* SEO metadata overrides at the page level */}
      <title>{`${project.title} Case Study | Stack&Scale`}</title>
      <meta name="description" content={project.desc} />

      {/* ─── AMBIENT GLOW BACKDROP ────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* ─── NAVIGATION HEADER ────────────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/95 border-stone-200/80 shadow-sm py-3'
            : 'bg-cosmic-black/90 border-stone-200/30 py-4'
        } backdrop-blur-xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex items-center justify-between px-6 max-w-7xl mx-auto w-full relative z-10">
          <Link href="/">
            <motion.div className="flex items-center gap-2.5 group cursor-pointer" whileHover={{ scale: 1.01 }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-50 border border-stone-200 shadow-sm relative overflow-hidden group-hover:border-blue-600/30 transition-all duration-300">
                <img src="/icon.png" alt="Stack & Scale Logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-semibold text-base tracking-tight text-stone-900 font-heading">
                Stack<span className="text-stone-500 font-light">&Scale</span>
              </span>
            </motion.div>
          </Link>

          {/* Centered Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="bg-stone-50 border border-stone-200 p-1 px-1.5 flex items-center gap-1 rounded-full relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]">
              {[
                { label: "Homepage", href: "/" },
                { label: "Capabilities", href: "/#services" },
                { label: "Selected Work", href: "/#portfolio" },
                { label: "Estimator", href: "/#offer" }
              ].map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-blue-600 transition-colors duration-200 relative py-2 px-3.5 cursor-pointer rounded-full z-10 text-[11px] font-semibold uppercase tracking-wider text-stone-500"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 bg-stone-200/60 rounded-full z-0 border border-stone-300/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <motion.button
                className="bg-stone-900 text-stone-50 text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-stone-900 transition-all duration-300 shadow-sm hover:bg-stone-850 cursor-pointer shrink-0"
                whileTap={{ scale: 0.97 }}
              >
                Start a Project
              </motion.button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 text-stone-500 hover:text-stone-900 focus:outline-none transition-colors touch-target"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </nav>

        {/* Mobile Dropdown Menu Canvas */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 top-[60px] bg-stone-900/10 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                className="lg:hidden w-full absolute top-full left-0 right-0 z-50 px-6 py-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl p-5 flex flex-col gap-3 shadow-xl z-50 relative">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Homepage</Link>
                  <Link href="/#services" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Capabilities</Link>
                  <Link href="/#portfolio" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Selected Work</Link>
                  <Link href="/#offer" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Estimator</Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-blue-600 hover:text-blue-700 transition-colors py-3.5 px-4 hover:bg-blue-50/50 rounded-xl text-xs font-bold tracking-wider uppercase">Contact Desk</Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

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
            <span className="text-blue-600 font-mono text-[10px] uppercase tracking-widest font-semibold">{project.label}</span>
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

            {/* Performance Parameters Grid */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-[10px] uppercase tracking-wider font-mono text-blue-600 font-bold block">Performance Parameters</span>
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-[inset_0_1px_1px_rgba(0,0,0,0.01)] hover:border-blue-500/10 transition-all">
                    <p className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mb-1">{m.label}</p>
                    <p className="text-sm font-bold text-stone-900 font-mono">{m.val}</p>
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

          {/* Right Column: Lighthouse Indicators & Sequence Blueprint */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24">
            {/* Lighthouse Circular Progress Widgets */}
            <motion.div 
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-[10px] uppercase tracking-wider font-mono text-blue-600 font-bold block mb-5 text-center sm:text-left">Lighthouse Metric Benchmarks</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { score: project.lighthouse.perf, title: "Performance" },
                  { score: project.lighthouse.access, title: "Accessibility" },
                  { score: project.lighthouse.best, title: "Best Practices" },
                  { score: project.lighthouse.seo, title: "SEO" }
                ].map((l, idx) => {
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                          <circle cx="36" cy="36" r="28" className="fill-none stroke-stone-100 stroke-[3.5]" />
                          <motion.circle 
                            cx="36" 
                            cy="36" 
                            r="28" 
                            className="fill-none stroke-blue-600 stroke-[3.5]" 
                            strokeDasharray="175.9" 
                            initial={{ strokeDashoffset: 175.9 }}
                            animate={{ strokeDashoffset: 175.9 - (175.9 * l.score) / 100 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                            strokeLinecap="round" 
                          />
                        </svg>
                        <span className="absolute font-mono text-[10px] font-bold text-stone-900">{l.score}</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 font-semibold leading-tight">{l.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

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
            Let's design and deploy custom, speed-optimized software tailored perfectly to your requirements and operations.
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
