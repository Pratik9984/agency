"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderSync } from '../useLoaderSync';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const
    }
  }
};

interface CroppedIllustrationProps {
  panel: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  alt: string;
  className?: string;
  priority?: boolean;
}

function CroppedIllustration({ panel, alt, className = '', priority = false }: CroppedIllustrationProps) {
  const positionMap = {
    'top-left': { left: '0%', top: '0%' },
    'top-center': { left: '-100%', top: '0%' },
    'top-right': { left: '-200%', top: '0%' },
    'bottom-left': { left: '0%', top: '-100%' },
    'bottom-center': { left: '-100%', top: '-100%' },
    'bottom-right': { left: '-200%', top: '-100%' },
  };

  const { left, top } = positionMap[panel];

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-[18px] ${className}`}>
      <Image
        src="/main.png"
        alt={alt}
        width={1200}
        height={800}
        sizes="(max-width: 640px) 540px, (max-width: 1024px) 1020px, 1260px"
        className="absolute max-w-none select-none pointer-events-none"
        style={{
          width: '300%',
          height: '200%',
          left,
          top,
        }}
        priority={priority}
      />
    </div>
  );
}


export default function Contact() {
  const animateTrigger = useLoaderSync();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Scroll Lock implementation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "c6e93123-fd49-4c99-bb4e-0e899425a7fc",
          subject: `New Project Scope Filed by ${formData.name}`,
          name: formData.name,
          phone: formData.phone || "Not provided",
          email: formData.email,
          message: formData.message || "Not provided",
        }),
      });
      const textData = await response.text();
      try {
        const result = JSON.parse(textData);
        if (result.success) {
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
          setStatus('idle');
          alert("Something went wrong. Please check your inputs and try again.");
        }
      } catch {
        setStatus('idle');
        alert("Network processing delay. Please check your data connection and try again.");
      }
    } catch {
      setStatus('idle');
      alert("System intake error. Please resubmit your configuration details.");
    }
  };

  return (
    <main className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-cosmic-black text-stone-900 flex flex-col justify-between noise-bg relative tracking-normal selection:bg-blue-500/10 selection:text-blue-900">

      {/* ─── AMBIENT GLOW BACKDROP ────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-b from-blue-500/[0.01] to-transparent pointer-events-none z-0" />

      {/* ─── NAVIGATION HEADER ────────────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/95 border-stone-200/80 shadow-sm py-3 backdrop-blur-xl'
            : 'bg-transparent border-transparent py-4'
        }`}
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

          {/* Centered Desktop Segmented Control Tab Bar */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="bg-stone-50 border border-stone-200 p-1 px-1.5 flex items-center gap-1 rounded-full relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]">
              {[
                { label: "Services", href: "/#services" },
                { label: "Work", href: "/#portfolio" },
                { label: "About", href: "/#about" }
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

          {/* Right Side: CTA Button */}
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

          {/* Mobile Hamburger Trigger */}
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

        {/* Mobile Dropdown Canvas */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop Click-to-Close */}
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
                  <Link href="/#services" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Services</Link>
                  <Link href="/#portfolio" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Work</Link>
                  <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">About</Link>
                  <Link href="/#faq" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">FAQ</Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-blue-600 hover:text-blue-700 transition-colors py-3.5 px-4 hover:bg-blue-50/50 rounded-xl text-xs font-bold tracking-wider uppercase">Contact Desk</Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── MAIN SPLITSCREEN INTENTION ────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center pt-24 pb-8 lg:py-0 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">

          {/* Left Column: Heading & Contact Info */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center text-left gap-5 lg:pr-6"
            initial={{ opacity: 0, x: -20 }}
            animate={animateTrigger ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-blue-600 font-mono text-[9px] tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(37,99,235,0.02)] backdrop-blur-md">
                Get in Touch
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight leading-[1.18] mb-4 font-heading text-stone-900">
                Let's build a website <br />
                to grow your <span className="font-serif italic font-light text-blue-600">business.</span>
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                Ready to build a fast, high-converting business website, launch an online booking or e-commerce storefront, or improve your local search rankings? Share your requirements below.
              </p>
            </div>

            {/* Compact, Beautiful Contact Info Rows */}
            <div className="flex flex-col divide-y divide-stone-200/80 w-full mt-4">
              {/* Email Item */}
              <a href="mailto:hello.stackandscale@gmail.com" className="py-4 flex items-center justify-between group transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/5 text-stone-550 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-stone-500 text-[8px] font-bold uppercase tracking-wider mb-0.5">Email Team</p>
                    <p className="text-stone-900 font-semibold text-xs sm:text-sm font-heading group-hover:text-blue-600 transition-colors">hello.stackandscale@gmail.com</p>
                  </div>
                </div>
                <span className="text-xs text-stone-400 group-hover:text-stone-900 transition-colors">&rarr;</span>
              </a>

              {/* WhatsApp Item */}
              <a href="https://wa.me/918421526195" target="_blank" rel="noopener noreferrer" className="py-4 flex items-center justify-between group transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  </div>
                  <div>
                    <p className="text-stone-500 text-[8px] font-bold uppercase tracking-wider mb-0.5">WhatsApp Direct</p>
                    <p className="text-stone-900 font-semibold text-xs sm:text-sm font-heading group-hover:text-emerald-600 transition-colors">+91 84215 26195</p>
                  </div>
                </div>
                <span className="text-xs text-stone-400 group-hover:text-stone-900 transition-colors">&rarr;</span>
              </a>

              {/* Instagram Item */}
              <a href="https://www.instagram.com/stack__and__scale" target="_blank" rel="noopener noreferrer" className="py-4 flex items-center justify-between group transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/5 text-stone-555 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771-4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-500 text-[8px] font-bold uppercase tracking-wider mb-0.5">Instagram</p>
                    <p className="text-stone-900 font-semibold text-xs sm:text-sm font-heading group-hover:text-pink-650 transition-colors">@stack__and__scale</p>
                  </div>
                </div>
                <span className="text-xs text-stone-400 group-hover:text-stone-900 transition-colors">&rarr;</span>
              </a>

              {/* Response Time Item */}
              <div className="py-4 flex items-center justify-between group transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/5 text-blue-600 flex items-center justify-center shrink-0 relative">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                    </span>
                  </div>
                  <div>
                    <p className="text-stone-500 text-[8px] font-bold uppercase tracking-wider mb-0.5">Response Time</p>
                    <p className="text-stone-900 font-semibold text-xs sm:text-sm font-heading">Within 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Project Scope Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={animateTrigger ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative w-full text-left">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success" className="flex flex-col items-center justify-center text-center py-6"
                    initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center mb-4 shadow-sm">
                      <motion.svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
                      </motion.svg>
                    </div>
                    <h2 className="text-lg font-semibold text-stone-900 mb-1.5 font-heading">Inquiry Received</h2>
                    <p className="text-stone-600 text-xs leading-relaxed font-light max-w-sm mb-5">
                      Thank you for sharing your project details. We will review your requirements and reach out within 24 hours.
                    </p>
                    <motion.button
                      onClick={() => setStatus('idle')}
                      className="bg-stone-50 border border-stone-200 text-stone-700 hover:text-stone-900 hover:border-stone-300 text-xs font-mono py-2 px-4 rounded-lg transition-all cursor-pointer shadow-sm"
                    >
                      Submit Another Inquiry
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-xs font-bold text-blue-600 mb-5 font-mono uppercase tracking-wider text-left">Tell us about your project</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500" htmlFor="name">
                            Your Name <span className="text-blue-600">*</span>
                          </label>
                          <input
                            required id="name" type="text" value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-blue-600 outline-none text-xs sm:text-sm text-stone-900 transition-all min-h-[44px]"
                          />
                        </div>

                        {/* Phone Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500" htmlFor="phone">
                            Phone Number <span className="text-stone-400 font-normal lowercase tracking-normal">(optional)</span>
                          </label>
                          <input
                            id="phone" type="tel" value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-blue-600 outline-none text-xs sm:text-sm text-stone-900 transition-all min-h-[44px]"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500" htmlFor="email">
                          Email Address <span className="text-blue-600">*</span>
                        </label>
                        <input
                          required id="email" type="email" value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-blue-600 outline-none text-xs sm:text-sm text-stone-900 transition-all min-h-[44px]"
                        />
                      </div>

                      {/* Message Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500" htmlFor="message">
                          Project Requirements <span className="text-stone-400 font-normal lowercase tracking-normal">(optional)</span>
                        </label>
                        <textarea
                          id="message" value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-blue-600 outline-none text-xs sm:text-sm text-stone-900 transition-all h-24 resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-stone-900 text-stone-50 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 relative shadow-md disabled:opacity-40 transition-all cursor-pointer group hover:bg-stone-850 min-h-[44px]"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {status === 'submitting' ? (
                          <>
                            <svg className="w-3.5 h-3.5 animate-spin text-stone-50" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── FOOTER ──────────────────────────────────── */}
      <footer className="bg-stone-950 text-stone-450 border-t border-stone-900 py-6 shrink-0 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-[9px] font-medium tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-stone-900 border border-stone-800 flex items-center justify-center relative overflow-hidden">
              <img src="/icon.png" alt="Stack & Scale Footer Logo" className="w-4.5 h-4.5 object-contain" />
            </div>
            <span className="font-semibold text-xs text-white font-heading tracking-tight">Stack<span className="text-stone-400 font-light">&Scale</span></span>
          </div>
          <span className="font-normal text-stone-500 normal-case text-center">© {new Date().getFullYear()} Stack&Scale. Built to grow businesses online.</span>
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