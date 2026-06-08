"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
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
            ].map((link, idx) => {
              const targetId = link.href.split('#')[1];
              const isActive = activeSection === targetId;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-250 relative py-2 px-3.5 cursor-pointer rounded-full z-10 text-[11px] font-semibold uppercase tracking-wider ${
                    isActive ? "text-blue-600 font-bold" : "text-stone-500 hover:text-blue-600"
                  }`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span className="relative z-10">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-1 h-1 rounded-full bg-blue-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
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
              );
            })}
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
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-blue-600 hover:text-blue-700 transition-colors py-3.5 px-4 hover:bg-blue-50/50 rounded-xl text-xs font-bold tracking-wider uppercase">Start a Project</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
