"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { useLoaderSync } from './useLoaderSync';
import { Project, portfolioProjects } from './work/projectsData';

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

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any
    }
  })
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

interface ToolkitItem {
  name: string;
  category: 'frontend' | 'backend' | 'devops';
  details: string;
  svgIcon: React.ReactNode;
}

const toolkitItems: ToolkitItem[] = [
  {
    name: "Next.js",
    category: "frontend",
    details: "Universal hybrid rendering framework. Merges server components with client interactivity, reducing initial script bundle downloads.",
    svgIcon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M128.2 135.5L72.2 60H60V120H71V74.8L120.4 141.2C123.1 139.5 125.8 137.6 128.2 135.5Z" fill="url(#nextjs_grad)" />
        <rect x="110" y="60" width="11" height="60" fill="white" />
        <defs>
          <linearGradient id="nextjs_grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "React",
    category: "frontend",
    details: "Industry-standard component architecture. Powering declarative, highly dynamic user interface layers and virtual DOM syncing.",
    svgIcon: (
      <svg className="w-5 h-5 text-[#61dafb]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1.2" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  },
  {
    name: "Vue.js",
    category: "frontend",
    details: "Approachable, high-performance reactive framework. Excellent for incremental layer integrations and sub-millisecond binding pipelines.",
    svgIcon: (
      <svg className="w-5 h-5" viewBox="0 0 256 221" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M204.8 0H256L128 220.8L0 0H51.2L128 132.48L204.8 0Z" fill="#41B883" />
        <path d="M0 0H51.2L128 132.48L204.8 0H256L128 220.8L0 0Z" fill="#41B883" />
        <path d="M128 132.48L204.8 0H153.6L128 44.16L102.4 0H51.2L128 132.48Z" fill="#35495E" />
      </svg>
    )
  },
  {
    name: "FastAPI",
    category: "backend",
    details: "Modern, rapid-execution Python API framework. Backed by fully integrated OpenAPI schema generation and strict pydantic structures.",
    svgIcon: (
      <svg className="w-5 h-5 text-[#009688]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48.2 2L15 55.4h28.5L34.8 98l49.8-53.4H53.5L64.8 2H48.2z" fill="#009688" />
      </svg>
    )
  },
  {
    name: "Django",
    category: "backend",
    details: "Batteries-included enterprise Python platform. Enforces pristine MVC logic, object-relational mapping, and ironclad server security controls.",
    svgIcon: (
      <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#092E20" />
        <path d="M35 30H50C60 30 68 37 68 50C68 63 60 70 50 70H35V30ZM45 40V60H50C55 60 58 56 58 50C58 44 55 40 50 40H45Z" fill="#44B78B" />
      </svg>
    )
  },
  {
    name: "Flask",
    category: "backend",
    details: "Lightweight, highly modular Python micro-framework. Perfect for microservices, scrapers, and isolated serverless API routes.",
    svgIcon: (
      <svg className="w-5 h-5 text-stone-850" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M40 30h20M50 30v15M30 75c0-15 15-30 20-30s20 15 20 30c0 5-5 5-20 5s-20 0-20-5z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    category: "backend",
    details: "The world's most advanced open-source relational database. Powering transactional consistency, ACID execution, and massive JSONB indexes.",
    svgIcon: (
      <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <ellipse cx="12" cy="11" rx="5" ry="1.5" />
        <path d="M7 11v3c0 1 2 1.5 5 1.5s5-.5 5-1.5v-3" />
        <path d="M7 14v3c0 1 2 1.5 5 1.5s5-.5 5-1.5v-3" />
      </svg>
    )
  },
  {
    name: "MySQL",
    category: "backend",
    details: "Ecosystem-standard relational database. Widely adopted for highly reliable web apps, content management hubs, and quick read queries.",
    svgIcon: (
      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    )
  },
  {
    name: "SQLite",
    category: "backend",
    details: "Ultra-compact, serverless transactional engine. Exceptional database choice for localized client states, testing suites, and mobile edge layers.",
    svgIcon: (
      <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    )
  },
  {
    name: "MongoDB",
    category: "backend",
    details: "Highly scale-optimized document database. Stores elastic JSON schemas natively, making it a stellar option for unstructured SaaS payloads.",
    svgIcon: (
      <svg className="w-5 h-5 text-[#13aa52]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 6 8 6 13C6 17 9 20 12 22C15 20 18 17 18 13C18 8 12 2 12 2Z" fill="#13AA52" />
        <path d="M12 2V22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Supabase",
    category: "backend",
    details: "Secure, real-time Postgres BaaS solution. Automates socket subscriptions, user authentication routes, and relational schema API bindings instantly.",
    svgIcon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.36 2L4 12.8h8.64L10.64 22 20 11.2h-8.64L13.36 2z" fill="#3ECF8E" />
      </svg>
    )
  },
  {
    name: "Firebase",
    category: "backend",
    details: "Enterprise cloud backend suite. Offers instant Firestore document listeners, Google Authentication protocols, and CDN asset storage.",
    svgIcon: (
      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.89 15.55L12 2.5a.5.5 0 0 1 .82.04l2.12 4.16-9.05 8.85zm16.59-1.92L12.72 4.9a.5.5 0 0 0-.82-.04L3.08 17.5a.5.5 0 0 0 .68.68l16.48-4.52a.5.5 0 0 0 .24-.03z" fill="#FFCA28" />
        <path d="M12 2.5a.5.5 0 0 1 .82.04l8.28 11.51a.5.5 0 0 1-.41.8L12.82 15a.5.5 0 0 1-.82-.04L9 10.8l3-8.3z" fill="#F57C00" />
      </svg>
    )
  },
  {
    name: "Git & GitHub",
    category: "devops",
    details: "Robust revision tracking and pull request architectures. Enforces code review safety, semantic releases, and clean branch deployments.",
    svgIcon: (
      <svg className="w-5 h-5 text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  {
    name: "Vercel",
    category: "devops",
    details: "Cutting-edge edge serverless host. Renders Next.js static builds globally near-instantaneously using high-density global edge networks.",
    svgIcon: (
      <svg className="w-5 h-5 text-stone-900" viewBox="0 0 115 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M57.5 0L115 100H0L57.5 0Z" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "Docker",
    category: "devops",
    details: "Universal containerization engine. Standardizes dependency sandboxes, guaranteeing identical execution on development and staging environments.",
    svgIcon: (
      <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10v6" />
        <rect x="6" y="6" width="4" height="4" rx="1" />
        <rect x="14" y="6" width="4" height="4" rx="1" />
        <rect x="10" y="12" width="4" height="4" rx="1" />
        <path d="M4 16h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2z" />
      </svg>
    )
  },
  {
    name: "Render",
    category: "devops",
    details: "Elegant, zero-overhead cloud deployment provider. Integrates continuous GitHub push hooks for databases, cron schedules, and raw web services.",
    svgIcon: (
      <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 17 22 12" />
      </svg>
    )
  }
];

const testimonials = [
  { quote: "Stack&Scale got our clinic website loading instantly. Patients started booking appointments online the next week. No more complex setup.", author: "Dr. Aditya Sen", role: "Lotus Health Clinic", initials: "AS" },
  { quote: "We needed a fast checkout that doesn't disconnect customers. The checkout setup Stack&Scale built using Stripe integration works perfectly on mobile.", author: "Founder & CEO", role: "Aura Crafted Products", initials: "AC" },
  { quote: "Our logistics business needed a fast local landing page. Stack&Scale optimized our sitemaps and schemas, and we are already seeing more local search traffic.", author: "Operations Manager", role: "Apex Logistics Ltd.", initials: "AL" }
];

export default function Home() {
  const animateTrigger = useLoaderSync();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = ["services", "portfolio", "about"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220;
      
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isBottom) {
        setActiveSection("about");
        return;
      }

      let active = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            active = sectionId;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 220, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);


  // Scope Planner state variables
  const [estType, setEstType] = useState("local"); // local, ecom, custom
  const [addonEmail, setAddonEmail] = useState(false);
  const [addonWhatsapp, setAddonWhatsapp] = useState(false);
  const [addonPayment, setAddonPayment] = useState(false);
  const [mobileStep, setMobileStep] = useState(1);

  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const handleServicesScroll = (e: any) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.scrollWidth / 3;
    const newIdx = Math.round(scrollLeft / itemWidth);
    if (newIdx >= 0 && newIdx <= 2) {
      setActiveServiceIdx(newIdx);
    }
  };
  const [activeTechTab, setActiveTechTab] = useState<'frontend' | 'backend' | 'devops'>('frontend');

  // Calibrated Runway Timeline Logic (in days)
  const baseRunway = estType === "local" ? 14 : estType === "ecom" ? 28 : 21;
  const emailRunway = addonEmail ? 2 : 0;
  const whatsappRunway = addonWhatsapp ? 1 : 0;
  const paymentRunway = addonPayment ? 4 : 0;
  const totalRunwayDays = baseRunway + emailRunway + whatsappRunway + paymentRunway;

  const formatRunwayText = (days: number) => {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    if (weeks > 0 && remainingDays > 0) {
      return `${weeks} Week${weeks > 1 ? 's' : ''}, ${remainingDays} Day${remainingDays > 1 ? 's' : ''}`;
    }
    if (weeks > 0) {
      return `${weeks} Week${weeks > 1 ? 's' : ''}`;
    }
    return `${days} Day${days > 1 ? 's' : ''}`;
  };

  // Roadmap Timeline Calculation
  const getTimelineDates = (totalDays: number) => {
    const today = new Date();
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const designDate = new Date(today);
    designDate.setDate(today.getDate() + 3);
    const buildDate = new Date(today);
    buildDate.setDate(today.getDate() + 8);
    const launchDate = new Date(today);
    launchDate.setDate(today.getDate() + totalDays);

    return [
      { label: "Discovery & Blueprint", date: formatDate(today), duration: "Days 1-3" },
      { label: "High-Fidelity Layout Design", date: formatDate(designDate), duration: "Days 4-8" },
      { label: "Full-Stack Implementation", date: formatDate(buildDate), duration: `Days 9-${totalDays - 2}` },
      { label: "Performance Audit & Launch", date: formatDate(launchDate), duration: "Launch Target" }
    ];
  };

  const [timelineDates, setTimelineDates] = useState<{ label: string; date: string; duration: string }[]>([
    { label: "Discovery & Blueprint", date: "T+0 days", duration: "Days 1-3" },
    { label: "High-Fidelity Layout Design", date: "T+3 days", duration: "Days 4-8" },
    { label: "Full-Stack Implementation", date: "T+8 days", duration: "Days 9-12" },
    { label: "Performance Audit & Launch", date: "T+14 days", duration: "Launch Target" }
  ]);

  useEffect(() => {
    setTimelineDates(getTimelineDates(totalRunwayDays));
  }, [totalRunwayDays]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35, restDelta: 0.001 });
  const progressOpacity = useTransform(scrollYProgress, [0, 0.005], [0, 1]);

  const [activeServiceDetail, setActiveServiceDetail] = useState<any | null>(null);

  // Real Core Web Vitals Audit State
  const [urlInput, setUrlInput] = useState('');
  const [auditStatus, setAuditStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [realScores, setRealScores] = useState({ perf: 0, access: 0, best: 0, seo: 0 });
  const [optimizedScores, setOptimizedScores] = useState({ perf: 0, access: 0, best: 0, seo: 0 });

  const getScoreColorClass = (score: number) => {
    if (score >= 90) return { stroke: "stroke-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/10" };
    if (score >= 50) return { stroke: "stroke-blue-500", text: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/10" };
    return { stroke: "stroke-red-500", text: "text-red-400", bg: "bg-red-500/5", border: "border-red-500/10" };
  };

  // Genuine Lighthouse audit execution via Google's PageSpeed API
  const startAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let targetUrl = urlInput.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    // Localhost boundary verification blocker
    const isLocal = /(localhost|127\.0\.0\.1|\.local|0\.0\.0\.0)/i.test(targetUrl);
    if (isLocal) {
      alert("Google's audit engine cannot scan a local website running on your computer. Please enter a live, publicly accessible website link (e.g., google.com or github.com) to test the live integration.");
      return;
    }

    setAuditStatus('scanning');
    setScanLogs([`[INFO] Pinging diagnostic network thread for ${targetUrl}...`]);
    setRealScores({ perf: 0, access: 0, best: 0, seo: 0 });
    setOptimizedScores({ perf: 0, access: 0, best: 0, seo: 0 });

    try {
      setScanLogs(prev => [...prev, "[INFO] Connecting to Google PageSpeed Insights API endpoint..."]);

      // Paste your API Key inside the string if you hit high volume request rejections
      const apiKey = "";
      const keyParam = apiKey ? `&key=${apiKey}` : '';

      const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile${keyParam}`;

      setScanLogs(prev => [...prev, "[INFO] Executing live remote Lighthouse core analysis loops (this takes 10-15 seconds)..."]);

      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Browser origin requires a free Google API Key to continue high-volume scanning.");
        }
        throw new Error("Target server refused connection, timed out, or the domain is completely unreachable.");
      }

      const data = await response.json();

      setScanLogs(prev => [...prev, "[INFO] Extracting node metric categories and runtime analysis data..."]);

      const perfScore = data.lighthouseResult?.categories?.performance?.score !== undefined
        ? Math.round(data.lighthouseResult.categories.performance.score * 100)
        : 0;

      const accessScore = data.lighthouseResult?.categories?.accessibility?.score !== undefined
        ? Math.round(data.lighthouseResult.categories.accessibility.score * 100)
        : 0;

      const bestScore = data.lighthouseResult?.categories?.['best-practices']?.score !== undefined
        ? Math.round(data.lighthouseResult.categories['best-practices'].score * 100)
        : 0;

      const seoScore = data.lighthouseResult?.categories?.seo?.score !== undefined
        ? Math.round(data.lighthouseResult.categories.seo.score * 100)
        : 0;

      if (perfScore === 0 && accessScore === 0) {
        throw new Error("Google API returned empty metrics. Please verify the link configuration or try another public website.");
      }

      setScanLogs(prev => [...prev, "[SUCCESS] Live operational metrics compiled successfully."]);

      setAuditStatus('complete');
      setRealScores({ perf: perfScore, access: accessScore, best: bestScore, seo: seoScore });
      setOptimizedScores({ perf: 100, access: 100, best: 100, seo: 100 });

    } catch (error: any) {
      setAuditStatus('idle');
      setScanLogs([]);
      alert(error?.message || "An unexpected error occurred. Please test with a different public website domain.");
    }
  };

  // Scroll Lock implementation
  // Scroll Lock implementation
  useEffect(() => {
    if (isMenuOpen || activeServiceDetail) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isMenuOpen, activeServiceDetail]);

  // Testimonials Auto-play timer (6 seconds)
  useEffect(() => {
    if (testimonials.length < 3) return;
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 192);
      mouseY.set(e.clientY - 192);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-cosmic-black text-stone-900 overflow-x-hidden relative tracking-normal selection:bg-blue-500/10 selection:text-blue-900 noise-bg">

      {/* ─── SCROLL PROGRESS INDICATOR ───────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 z-[100] origin-left"
        style={{ scaleX, opacity: progressOpacity }}
      />

      {/* ─── AMBIENT GLOW BACKDROP ────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[85vh] bg-gradient-to-b from-blue-500/[0.01] to-transparent pointer-events-none z-0" />

      {/* ─── FLOATING WHATSAPP BUTTON ────────────────────── */}
      <AnimatePresence>
        {scrolled && (
          <motion.a
            href="https://wa.me/918421526195"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg flex items-center justify-center group hover:bg-[#20ba5a] transition-all duration-300 dynamic-shadow"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>

      {/* ─── NAVIGATION HEADER ────────────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled
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
                  <Link href="#services" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Services</Link>
                  <Link href="#portfolio" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">Work</Link>
                  <Link href="#about" onClick={() => setIsMenuOpen(false)} className="text-stone-600 hover:text-stone-900 transition-colors py-3.5 px-4 hover:bg-stone-50 rounded-xl text-xs font-semibold tracking-wider uppercase border-b border-stone-100/50 last:border-0">About</Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-blue-600 hover:text-blue-700 transition-colors py-3.5 px-4 hover:bg-blue-50/50 rounded-xl text-xs font-bold tracking-wider uppercase">Start a Project</Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 md:pt-36 md:pb-20 lg:pt-44 lg:pb-28 overflow-hidden z-10">
        <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#FAFBFD_90%)] pointer-events-none z-0" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={animateTrigger ? "visible" : "hidden"}
          className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          {/* Left Column: Content */}
          <div className="relative lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            {/* Mobile Transparent Illustration Background */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] aspect-[3/2] pointer-events-none lg:hidden -z-10 opacity-[0.28] blur-[0.2px]">
              <Image
                src="/main.png"
                alt=""
                fill
                sizes="480px"
                className="object-contain select-none"
              />
            </div>
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 mb-6 px-4.5 py-2 rounded-full bg-stone-50/80 border border-stone-200/80 text-[11px] sm:text-xs font-semibold text-stone-600 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(37,99,235,0.03)] backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              IT Solution & Web Development Agency
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] tracking-tight mb-6 leading-[1.08] text-stone-900 font-heading font-light max-w-4xl"
            >
              In-house web & IT engineering. <br />
              <span className="font-serif italic font-light text-blue-600">Zero outsourced code.</span>
            </motion.h1>

            <motion.div
              variants={staggerItem}
              className="mb-8 lg:mb-8 text-stone-600 text-sm sm:text-base md:text-lg font-light max-w-2xl"
            >
              Our in-house team engineers custom websites, scalable web applications, and comprehensive IT solutions with zero outsourced code, tailored for global businesses.
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center w-full sm:w-auto"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  className="w-full sm:w-auto bg-stone-900 text-stone-50 font-bold px-9 py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(28,25,23,0.08)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.15)] transition-all duration-300 hover:bg-stone-850 cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Project
                  <svg className="w-4 h-4 stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.button>
              </Link>
              <a href="#portfolio" className="text-stone-500 hover:text-stone-900 font-bold text-xs uppercase tracking-widest py-3 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0">
                View Selected Work
                <svg className="w-3.5 h-3.5 stroke-current stroke-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-8 lg:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-8 text-stone-500/70 text-[11px] sm:text-xs font-semibold tracking-widest uppercase"
            >
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Fast Hand-Coded React</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Direct local SEO integration</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />No recurring template fees</div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image Asset */}
          <div className="hidden lg:flex lg:col-span-5 relative w-full justify-end">
            <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full w-72 h-72 lg:w-96 lg:h-96 -z-10 animate-pulse" />
            <motion.div
              variants={staggerItem}
              className="relative w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[500px] aspect-[3/2] p-1.5 bg-white border border-stone-200/80 rounded-[24px] shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden animate-float-slow"
            >
              <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-white">
                <Image
                  src="/main.png"
                  alt="Stack&Scale Technology Illustration"
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 500px"
                  className="object-contain select-none pointer-events-none bg-white"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── CORE SPEED SHOWCASE SECTION ─── */}
      <section className="py-12 md:py-20 bg-slate-900 relative overflow-hidden">
        {/* Ambient background grid inside the dark section */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0F172A_95%)] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="relative max-w-5xl w-full mx-auto p-px rounded-2xl bg-gradient-to-b from-blue-500/30 via-slate-800 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-[#1E293B]/90 backdrop-blur-3xl rounded-[15px] overflow-hidden p-6 sm:p-8 flex flex-col gap-6 border border-slate-700/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="px-2 sm:px-4 py-1 rounded-md bg-slate-900 border border-slate-800 text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-wide truncate max-w-[170px] sm:max-w-none">
                  https://stackandscale.in
                </div>
                <div className="w-8" />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2 flex flex-col gap-4 text-left">
                  <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
                    <div>
                      <p className="text-blue-400 text-[9px] uppercase tracking-wider font-semibold mb-1">Performance Score</p>
                      <p className="text-2xl font-bold text-white tracking-tight">99/100 <span className="text-blue-400 text-xs font-mono ml-1">Lighthouse Rating</span></p>
                    </div>
                    <div className="h-8 w-20">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <path d="M0,32 Q20,15 40,25 T80,8 T100,20 L100,40 L0,40 Z" fill="rgba(59,130,246,0.05)" />
                        <path d="M0,32 Q20,15 40,25 T80,8 T100,20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                      <p className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold mb-1">First Contentful Paint</p>
                      <p className="text-lg font-bold text-slate-200 font-mono">0.3s</p>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                      <p className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold mb-1">Network Responsiveness</p>
                      <p className="text-lg font-bold text-emerald-400 font-mono">&lt; 50ms TTFB</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between text-left gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Engineered to Convert</p>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">Whether it's a critical customer portal or a marketing page, our team bypasses slow, generic code templates. Everything loads instantly to make sure you don't lose leads.</p>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" initial={{ width: 0 }} whileInView={{ width: "98%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES SECTION ─────────────────────────────── */}
      <section id="services" className="py-10 md:py-24 relative border-t border-stone-200/60 bg-cosmic-black/30 overflow-hidden">
        {/* Subtle grid pattern and radial highlight for premium texture */}
        <div className="absolute inset-0 grid-bg opacity-35 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.03),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-8 lg:mb-16 text-left">
            <div className="lg:col-span-7">
              <p className="text-blue-600 font-mono text-[10px] tracking-widest uppercase mb-2 md:mb-3">What We Do</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mb-3 md:mb-4 font-heading leading-tight">
                High-performance sites focused on your <span className="font-serif italic font-light text-blue-600">bottom line.</span>
              </h2>
              <motion.p className="text-stone-600 text-sm leading-relaxed font-light mb-4 md:mb-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                We design and build custom websites, web applications, and tailored IT systems. Everything we engineer is fast, clean, secure, and optimized for global and local search indexing.
              </motion.p>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] aspect-[4/3] bg-white border border-stone-200/80 p-1.5 rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.03)] overflow-hidden hidden lg:block animate-float-medium hover:border-blue-500/20 transition-colors duration-300">
                <CroppedIllustration panel="top-left" alt="Ideation & Design Process" />
              </div>
            </div>
          </div>
 
            <div className="mt-12 border-t border-stone-200/60 w-full divide-y divide-stone-200/60">
              {[
                {
                  id: "web-dev",
                  title: "Web & IT Engineering",
                  desc: "High-performance websites, custom web applications, and enterprise IT setups. We design secure database backends, custom APIs, cloud infrastructures, and integrations built for speed.",
                  features: ["Custom Web Apps", "Cloud Systems", "Tailored DBs"],
                  tag: "Full-Stack & IT Solutions",
                  subtitle: "Custom web architectures and IT integrations built for speed.",
                  challenge: "Bloated template builders and generic IT integrations lock businesses into legacy code, slow response times, and security vulnerabilities.",
                  solution: "We engineer custom website architectures, APIs, and cloud services from scratch, ensuring zero template bloat, complete control, and repository ownership.",
                  lighthouse: { perf: 100, access: 98, best: 100, seo: 100 },
                  deliverables: ["Custom websites & portals", "API & database integrations", "Cloud delivery & security setups", "Complete system ownership"]
                },
                {
                  id: "ecom",
                  title: "E-Commerce & Transaction Systems",
                  desc: "Secure, high-throughput digital commerce architectures and transaction funnels. Integrated with payment gateways and enterprise inventory, scheduling, and invoicing pipelines.",
                  features: ["Frictionless checkout", "Stripe API Integration", "Speed product catalogs"],
                  tag: "E-Commerce",
                  subtitle: "Optimized checkouts, payment links, and booking flows.",
                  challenge: "Standard template store checkouts suffer from rigid steps, slow render bottlenecks, and poor API integrations, causing high conversion drops.",
                  solution: "We integrate custom Stripe, Razorpay, or custom checkout gateways into high-performance product listings, closing conversions instantly.",
                  lighthouse: { perf: 98, access: 100, best: 98, seo: 100 },
                  deliverables: ["Razorpay/Stripe API pipelines", "Real-time stock reservation", "Instant invoice/receipt dispatch", "Cart drop-off recovery hooks"]
                },
                {
                  id: "seo",
                  title: "SEO & Performance Engineering",
                  desc: "Technical search optimization and clean page speed engineering to guarantee maximum visibility. We embed structured JSON-LD schemas directly into semantic HTML structures.",
                  features: ["JSON-LD local schema", "Sub-second load times", "Optimized lead forms"],
                  tag: "Online Growth",
                  subtitle: "Valid structured data schemas and Google Core Web Vitals audit compliance.",
                  challenge: "Generic plugins only generate basic metadata, leaving underlying layout delays (LCP/CLS) and search index blocks unresolved.",
                  solution: "We implement valid local business schemas, clean semantic structure, and optimized asset routing to accelerate indexing and visibility.",
                  lighthouse: { perf: 100, access: 100, best: 100, seo: 100 },
                  deliverables: ["JSON-LD local business profile schemas", "Sub-second LCP benchmark speeds", "Semantic HTML5 structural outlines", "Optimized lead capture funnels"]
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  custom={idx}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover="hover"
                  onClick={() => setActiveServiceDetail(item)}
                  className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group cursor-pointer border border-transparent hover:border-stone-200/50 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] px-6 -mx-6 rounded-[20px] transition-all duration-300"
                >
                  <div className="max-w-2xl text-left">
                    <span className="text-blue-600 font-mono text-[9px] uppercase tracking-wider font-semibold block mb-2">{item.tag}</span>
                    <h3 className="text-xl font-medium text-stone-900 mb-2 font-heading tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed text-sm font-light">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-stone-100 pt-4 md:pt-0 shrink-0">
                    <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-stone-600">
                      {item.features.map((feat) => (
                        <span key={feat} className="px-2.5 py-1 rounded bg-stone-50 border border-stone-200/60 text-stone-700">{feat}</span>
                      ))}
                    </div>
                    <motion.div 
                      variants={{
                        rest: { x: 0, scale: 1, backgroundColor: "rgba(37, 99, 235, 0.05)", borderColor: "rgba(37, 99, 235, 0.15)", color: "#2563eb" },
                        hover: { x: 6, scale: 1.05, backgroundColor: "#2563eb", borderColor: "#2563eb", color: "#ffffff" }
                      }}
                      initial="rest"
                      className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* ─── PORTFOLIO SHOWCASE SECTION WITH INTERACTIVE FILTERING ─── */}
      <section id="portfolio" className="py-12 md:py-20 bg-cosmic-black/20 relative border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-blue-600 font-mono text-[10px] tracking-widest uppercase mb-3">Case Studies</p>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-stone-900 mb-3 font-heading">Successful digital products built for <span className="font-serif italic font-light text-blue-600">growing brands.</span></h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">Explore bespoke websites and digital platforms built to help brands expand their presence and increase their revenues online.</p>
          </div>

          <motion.div 
            ref={portfolioContainerRef}
            className="mt-12 border-t border-stone-200/60 w-full divide-y divide-stone-200/60"
            layout
          >
            <AnimatePresence mode="popLayout">
              {portfolioProjects.map((project) => (
                <motion.div
                  key={project.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                  className="py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center text-left"
                >
                  {/* Left Column: Mockup wrapper */}
                  <div className="w-full lg:w-1/2 aspect-[16/10] bg-stone-50 border border-stone-200/80 rounded-xl overflow-hidden shadow-sm shrink-0">
                    {project.mockup}
                  </div>
                  {/* Right Column: Content */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
                    <span className="text-blue-600 font-mono text-[9px] uppercase tracking-wider font-semibold block mb-2">{project.label}</span>
                    <h3 className="text-2xl font-medium text-stone-900 mb-3 font-heading tracking-tight">{project.title}</h3>
                    <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-light mb-6">{project.desc}</p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <Link href={`/work/${project.slug}`} className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1.5 cursor-pointer hover:text-blue-500 transition-colors">
                        Explore System Architecture
                        <svg className="w-3.5 h-3.5 stroke-blue-600 stroke-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                      <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-stone-600">
                        {project.tech.map((t, idx) => <span key={idx} className="px-2.5 py-1 rounded bg-stone-50 border border-stone-200/60 text-stone-700">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR MISSION & PHILOSOPHY ─── */}
      <section id="about" className="py-16 md:py-24 bg-white relative border-t border-stone-200/60 overflow-hidden">
        {/* Decorative background visual elements */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.02),transparent_40%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200/80 text-[10px] sm:text-xs font-semibold text-stone-600 uppercase tracking-widest shadow-sm">
            Our Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mb-6 font-heading leading-tight">
            We do <span className="font-serif italic font-light text-blue-600">not outsource</span> our code.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto mb-8">
            We partner with enterprise founders, clinical networks, and corporate stakeholders to architect high-performance software systems. Bypassing the bloated agency model of subcontracting, our in-house engineering team handles every aspect of system design, database integration, and cloud deployment, ensuring absolute security, data integrity, and elite performance benchmarks.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/contact">
              <motion.button className="bg-stone-900 text-stone-50 font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl cursor-pointer hover:bg-stone-850 shadow-md transition-all" whileTap={{ scale: 0.98 }}>
                Work with our team
              </motion.button>
            </Link>
            <a href="https://wa.me/918421526195" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 transition-colors">
              Chat on WhatsApp &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY PROCESS TIMELINE SECTION ─── */}
      <section className="py-12 md:py-20 bg-cosmic-black/25 relative border-t border-stone-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-600 font-mono text-[10px] tracking-widest uppercase mb-3">Our Process</p>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-stone-900 mb-3 font-heading">Clear milestones, <span className="font-serif italic font-light text-blue-600">visible progression.</span></h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">We manage your design and web development through transparent phases, ensuring a successful launch that drives results.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Connected timeline steps */}
            <div className="lg:col-span-7 space-y-6 relative pl-6 sm:pl-8 border-l border-stone-200/80 ml-2">
              {[
                { num: "01", step: "Discovery & Strategy", desc: "Analyzing your business goals, target audience, and structuring a map to optimize conversions." },
                { num: "02", step: "Aesthetic UI/UX Design", desc: "Creating a premium, minimal visual design system and interactive mockups tailored to your brand." },
                { num: "03", step: "Web & IT Engineering", desc: "Building high-performance websites and secure IT setups using modern, lightweight architectures tailored for speed." },
                { num: "04", step: "SEO Audit & Launch", desc: "Validating Core Web Vitals to achieve near-perfect performance scores, testing schemas, and deploying to production." }
              ].map((p, idx) => (
                <motion.div
                  key={p.num} 
                  className="pb-8 last:pb-0 flex flex-col gap-2 text-left relative transition-all duration-300 group cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                  }}
                >
                  <motion.div 
                    variants={{
                      rest: { scale: 1, borderColor: "rgba(200, 90, 56, 0.25)", backgroundColor: "#ffffff" },
                      hover: { scale: 1.2, borderColor: "#C85A38", backgroundColor: "#C85A38" }
                    }}
                    initial="rest"
                    className="absolute -left-[35px] sm:-left-[43px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 shadow-sm transition-all duration-300"
                  >
                    <motion.span 
                      variants={{
                        rest: { backgroundColor: "#C85A38", scale: 1 },
                        hover: { backgroundColor: "#ffffff", scale: 0.8 }
                      }}
                      className="w-1.5 h-1.5 rounded-full" 
                    />
                  </motion.div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-tight font-heading group-hover:text-blue-600 transition-colors">{p.step}</h3>
                    <span className="text-xs font-mono font-bold text-stone-400 bg-stone-50/50 px-2 py-0.5 rounded border border-stone-200/60">{p.num}</span>
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Right: Process Illustration card */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6">
              <div className="w-full max-w-[180px] sm:max-w-[340px] aspect-[4/3] bg-white border border-stone-200 p-1.5 rounded-[24px] shadow-sm overflow-hidden">
                <CroppedIllustration panel="bottom-center" alt="Engineering & Data Analysis Process" />
              </div>
              <div className="text-center lg:text-left max-w-sm">
                <h4 className="font-semibold text-stone-950 text-sm mb-1.5 font-heading">Data-Driven Refinement</h4>
                <p className="text-stone-550 text-xs font-light leading-relaxed">We measure layout load performance and visual rendering pipelines at every milestone to ensure compliance with speed targets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE WEB VITALS DIAGNOSTICS SCANNER ─── */}
      <section id="diagnostics" className="py-12 md:py-20 bg-cosmic-black/20 relative border-t border-stone-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            {/* Left Column: Diagnostics text & Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-blue-600 font-semibold text-[10px] uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(37,99,235,0.03)] backdrop-blur-md">Optimization Diagnostics</span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mb-4 font-heading leading-tight">Analyze your current <span className="font-serif italic font-light text-blue-600">website speed.</span></h2>
              <p className="text-stone-600 text-sm leading-relaxed font-light mb-8 max-w-md">Sub-optimal layout performance directly compromises customer acquisition and search indexing. Input your URL below to run a genuine inline scan of your system's Core Web Vitals directly inside this page using Google's PageSpeed Insights API.</p>
              
              <div className="w-full max-w-[280px] aspect-[4/3] bg-white border border-stone-200 p-1.5 rounded-[24px] shadow-sm overflow-hidden hidden lg:block">
                <CroppedIllustration panel="bottom-left" alt="Diagnostics Magnifier Illustration" />
              </div>
            </div>

            {/* Right Column: Diagnostic Scanner Terminal */}
            <div className="lg:col-span-7 w-full">
              <div className="w-full bg-white border border-stone-200 rounded-[24px] p-5 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(28,25,23,0.03)] backdrop-blur-md">
                <form onSubmit={startAudit} className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b border-stone-100">
                  <div className="flex-1 relative">
                    <input
                      type="text" placeholder="enter your domain (e.g. yourbusiness.com)" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} disabled={auditStatus === 'scanning'}
                      className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:border-blue-500/40 outline-none text-sm text-stone-900 placeholder-stone-400 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px]"
                    />
                  </div>
                  <motion.button type="submit" disabled={auditStatus === 'scanning' || !urlInput.trim()} className="bg-stone-900 text-stone-50 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl cursor-pointer disabled:opacity-40 transition-all shrink-0 flex items-center justify-center gap-2 hover:bg-stone-850 hover:shadow-md min-h-[48px]" whileTap={{ scale: 0.98 }}>
                    {auditStatus === 'scanning' ? "Auditing System..." : "Run Live Core Audit"}
                  </motion.button>
                </form>
                <p className="text-[10px] text-stone-500 font-light -mt-2 mb-6 text-left">
                  We connect directly to Google's PageSpeed Insights API—results are fetched and calculated inline below, without opening external tabs.
                </p>

            <AnimatePresence mode="wait">
              {auditStatus === 'idle' && (
                <motion.div key="idle" className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-stone-500 text-xs font-light tracking-wide">Awaiting target system parameters validation above. This will perform an inline scan via the PageSpeed Insights API.</p>
                </motion.div>
              )}

              {auditStatus === 'scanning' && (
                <motion.div key="scanning" className="flex flex-col rounded-xl border border-stone-200 bg-stone-50 overflow-hidden shadow-2xl relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* macOS Terminal Titlebar */}
                  <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 bg-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/40" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                      <span className="w-3 h-3 rounded-full bg-green-500/40" />
                      <span className="text-[10px] font-mono text-stone-500 ml-2">diagnostic-terminal.sh</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                      <span className="text-[9px] font-mono text-blue-600 uppercase font-semibold">Running Scan</span>
                    </div>
                  </div>
                  {/* Terminal Shell Logs */}
                  <div className="p-5 h-56 overflow-y-auto font-mono text-[11px] text-stone-700 leading-relaxed text-left flex flex-col gap-2.5 custom-scrollbar bg-stone-50/50 break-words">
                    {scanLogs.map((log, idx) => (
                      <motion.div key={idx} className={log.includes('[WARN]') ? "text-blue-600 font-medium" : log.includes('[SUCCESS]') ? "text-emerald-700 font-semibold" : "text-stone-550"} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}>
                        <span className="text-stone-400 mr-2">&gt;</span>{log}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {auditStatus === 'complete' && (
                <motion.div key="complete" className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Your Real Score Card */}
                    <div className="p-6 rounded-2xl bg-red-500/[0.01] border border-red-200/60 flex flex-col gap-6 text-left relative overflow-hidden shadow-inner">
                      <span className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-wider uppercase py-0.5 px-2.5 rounded bg-red-50 border border-red-200 text-red-700">Your Real Score</span>
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-red-700 mb-1">Live Inspected Layout Delay</h4>
                        <p className="text-[10px] text-stone-550 font-light">Genuine metrics parsed from your live stylesheet configurations and document assets.</p>
                      </div>

                      {/* Circular Gauge Grid */}
                      <div className="grid grid-cols-4 gap-2 pt-2">
                        {[
                          { score: realScores.perf, title: "Perf" },
                          { score: realScores.access, title: "Access" },
                          { score: realScores.best, title: "Best" },
                          { score: realScores.seo, title: "SEO" }
                        ].map((m, idx) => {
                          const col = getScoreColorClass(m.score);
                          return (
                            <div key={idx} className="flex flex-col items-center gap-2">
                              <div className="relative w-11 h-11 min-[380px]:w-14 min-[380px]:h-14 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                                  <circle cx="36" cy="36" r="28" className="fill-none stroke-stone-100 stroke-[3]" />
                                  <motion.circle 
                                    cx="36" cy="36" r="28" 
                                    className={`fill-none ${col.stroke} stroke-[3.5]`} 
                                    strokeDasharray="175.9" 
                                    initial={{ strokeDashoffset: 175.9 }}
                                    animate={{ strokeDashoffset: 175.9 - (175.9 * m.score) / 100 }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                                    strokeLinecap="round" 
                                  />
                                </svg>
                                <span className={`absolute font-mono text-xs font-bold ${col.text}`}>{m.score}</span>
                              </div>
                              <span className="text-[9px] uppercase tracking-wider font-mono font-semibold text-stone-500">{m.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stack&Scale Target Card */}
                    <div className="p-6 rounded-2xl bg-blue-500/[0.01] border border-blue-200/60 flex flex-col gap-6 text-left relative overflow-hidden shadow-inner">
                      <span className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-wider uppercase py-0.5 px-2.5 rounded bg-blue-50 border border-blue-200 text-blue-700">Stack&Scale Target</span>
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-blue-700 mb-1">Optimized Execution Structure</h4>
                        <p className="text-[10px] text-stone-550 font-light">Edge route data compiling handles layout loads. Clean static delivery protects execution.</p>
                      </div>

                      {/* Circular Gauge Grid */}
                      <div className="grid grid-cols-4 gap-2 pt-2">
                        {[
                          { score: optimizedScores.perf, title: "Perf" },
                          { score: optimizedScores.access, title: "Access" },
                          { score: optimizedScores.best, title: "Best" },
                          { score: optimizedScores.seo, title: "SEO" }
                        ].map((m, idx) => {
                          const col = getScoreColorClass(m.score);
                          return (
                            <div key={idx} className="flex flex-col items-center gap-2">
                              <div className="relative w-11 h-11 min-[380px]:w-14 min-[380px]:h-14 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                                  <circle cx="36" cy="36" r="28" className="fill-none stroke-stone-100 stroke-[3]" />
                                  <motion.circle 
                                    cx="36" cy="36" r="28" 
                                    className={`fill-none stroke-emerald-600 stroke-[3.5]`} 
                                    strokeDasharray="175.9" 
                                    initial={{ strokeDashoffset: 175.9 }}
                                    animate={{ strokeDashoffset: 175.9 - (175.9 * m.score) / 100 }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                                    strokeLinecap="round" 
                                  />
                                </svg>
                                <span className={`absolute font-mono text-xs font-bold text-emerald-600`}>{m.score}</span>
                              </div>
                              <span className="text-[9px] uppercase tracking-wider font-mono font-semibold text-stone-500">{m.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* ─── TECH STACK SECTION ────────────────────────────── */}
      <section className="py-12 md:py-20 bg-cosmic-black/25 relative border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 text-left">
            <div className="lg:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-blue-600 font-semibold text-[10px] uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(37,99,235,0.03)] backdrop-blur-md">Tech Stack Toolkit</span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mb-4 font-heading leading-tight">Modern web standards only.</h2>
              <p className="text-stone-600 text-sm leading-relaxed font-light">We leverage modern frameworks and clean coding architectures to ensure your website is incredibly fast, responsive, and easy to maintain.</p>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] aspect-[4/3] bg-white border border-stone-200 p-1.5 rounded-[24px] shadow-sm overflow-hidden hidden lg:block">
                <CroppedIllustration panel="bottom-center" alt="Technology Stack & Databases" />
              </div>
            </div>
          </div>

          {/* Tech Stack Tab Selector */}
          <div className="flex items-center justify-center bg-stone-50 border border-stone-200 p-1 rounded-xl mb-6 max-w-md mx-auto w-full">
            {[
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend & DB' },
              { id: 'devops', label: 'DevOps & Cloud' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTechTab(tab.id as any)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTechTab === tab.id ? 'bg-stone-900 text-stone-50 shadow-md' : 'text-stone-500 hover:text-stone-900'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeTechTab === 'frontend' && (
                <motion.div 
                  key="frontend"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-2xl bg-white border border-stone-200 backdrop-blur-sm text-left relative overflow-hidden gap-4 w-full max-w-4xl mx-auto flex flex-col"
                >
                  <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-700 font-mono">Frontend Core</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {toolkitItems.filter(t => t.category === "frontend").map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 3 }}
                        className="p-2.5 rounded-xl bg-stone-50/60 border border-stone-200/80 hover:border-blue-500/30 flex items-center gap-3 transition-all duration-200 group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-md bg-white border border-stone-200 group-hover:border-blue-500/20 flex items-center justify-center transition-all shrink-0">
                          {item.svgIcon}
                        </div>
                        <span className="font-semibold text-stone-700 text-xs group-hover:text-stone-900 transition-colors">{item.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTechTab === 'backend' && (
                <motion.div 
                  key="backend"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-2xl bg-white border border-stone-200 backdrop-blur-sm text-left relative overflow-hidden gap-4 w-full max-w-4xl mx-auto flex flex-col"
                >
                  <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-700 font-mono">Backend & Database</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {toolkitItems.filter(t => t.category === "backend").map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 3 }}
                        className="p-2.5 rounded-xl bg-stone-50/60 border border-stone-200/80 hover:border-blue-500/30 flex items-center gap-3 transition-all duration-200 group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-md bg-white border border-stone-200 group-hover:border-blue-500/20 flex items-center justify-center transition-all shrink-0">
                          {item.svgIcon}
                        </div>
                        <span className="font-semibold text-stone-700 text-xs group-hover:text-stone-900 transition-colors leading-tight">{item.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTechTab === 'devops' && (
                <motion.div 
                  key="devops"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-2xl bg-white border border-stone-200 backdrop-blur-sm text-left relative overflow-hidden gap-4 w-full max-w-4xl mx-auto flex flex-col"
                >
                  <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-700 font-mono">DevOps & Cloud</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {toolkitItems.filter(t => t.category === "devops").map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 3 }}
                        className="p-2.5 rounded-xl bg-stone-50/60 border border-stone-200/80 hover:border-blue-500/30 flex items-center gap-3 transition-all duration-200 group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-md bg-white border border-stone-200 group-hover:border-blue-500/20 flex items-center justify-center transition-all shrink-0">
                          {item.svgIcon}
                        </div>
                        <span className="font-semibold text-stone-700 text-xs group-hover:text-stone-900 transition-colors leading-tight">{item.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE COST CALCULATOR & PARTNERSHIPS ─── */}
      <section id="offer" className="py-12 md:py-20 bg-cosmic-black/25 relative overflow-hidden border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-blue-600 font-semibold text-[10px] uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(37,99,235,0.03)] backdrop-blur-md">Project Scope Planner</span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-stone-900 mb-3 font-heading">Plan your project <span className="font-serif italic font-light text-blue-600">timeline.</span></h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">Select the web architecture and integration modules your business needs below to map your delivery runway in real-time.</p>
          </div>

          {/* Mobile Step Progress Indicator */}
          <div className="flex items-center justify-between mb-6 lg:hidden max-w-sm mx-auto bg-stone-50 border border-stone-200/80 px-4 py-2.5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wide">Configure Project</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-350 ${mobileStep === step ? "w-6 bg-blue-600" : "w-1.5 bg-stone-200"}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-blue-600 font-bold">Step {mobileStep} / 3</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start mb-16">
            {/* Left Options Cluster - Hidden on mobile if step is 3 */}
            <div className={`lg:col-span-3 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left shadow-[inset_0_1px_1px_rgba(28,25,23,0.01)] ${mobileStep === 3 ? "hidden lg:flex" : "flex"}`}>

              {/* Step 1: Base Selection */}
              <div className={`${mobileStep === 1 ? "block" : "hidden lg:block"}`}>
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider block mb-2">01 / Choose Core Architecture</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  {[
                    { id: "local", label: "Enterprise Brand Portal", runway: "2 Weeks (14 Days) base", desc: "Corporate portals, clinical platforms, institutional networks, and directories." },
                    { id: "ecom", label: "E-Commerce Suite", runway: "4 Weeks (28 Days) base", desc: "Online storefronts, room booking systems, and carts." },
                    { id: "custom", label: "SaaS & Operations Panel", runway: "3 Weeks (21 Days) base", desc: "Real-time panels, logistics hubs, client dashboards, and custom cloud apps." }
                  ].map((item) => (
                    <button
                      key={item.id} onClick={() => setEstType(item.id)}
                      className={`p-5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${estType === item.id ? "bg-stone-900 text-stone-50 border-stone-900 shadow-md" : "bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300"}`}
                    >
                      <div>
                        <p className="font-semibold text-xs sm:text-sm mb-1">{item.label}</p>
                        <p className={`text-[11px] font-mono font-semibold mb-3 ${estType === item.id ? "text-blue-300" : "text-blue-600"}`}>
                          {item.runway}
                        </p>
                      </div>
                      <p className={`text-[10px] font-light leading-snug ${estType === item.id ? "text-stone-300" : "text-stone-500"}`}>{item.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Mobile Navigation for Step 1 */}
                <div className="mt-6 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileStep(2)}
                    className="w-full bg-stone-900 text-stone-50 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-stone-850 transition-colors duration-200"
                  >
                    Continue to Add-ons
                    <svg className="w-3.5 h-3.5 stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>

              {/* Step 2: Specific Integration Checklist Addons */}
              <div className={`${mobileStep === 2 ? "block" : "hidden lg:block"}`}>
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider block mb-2">02 / Select Required Add-on Modules</span>
                <div className="flex flex-col gap-2.5 mt-3">

                  {/* Email Addon Toggle */}
                  <button onClick={() => setAddonEmail(!addonEmail)} className="flex items-start justify-between p-5 rounded-xl border bg-stone-50 border-stone-200 hover:border-stone-300 hover:bg-stone-100/30 transition-all text-left cursor-pointer gap-3 min-h-[48px]">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5 ${addonEmail ? "bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)]" : "border-stone-300 bg-white"}`}>
                        {addonEmail && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-stone-900">Automated Email Integration</p>
                        <p className="text-[10px] sm:text-[11px] text-stone-500 font-light leading-relaxed">Automated lead routing, client verification emails, and customized contact form pipelines.</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-600 shrink-0 ml-2 mt-0.5">+2 Days</span>
                  </button>

                  {/* WhatsApp Addon Toggle */}
                  <button onClick={() => setAddonWhatsapp(!addonWhatsapp)} className="flex items-start justify-between p-5 rounded-xl border bg-stone-50 border-stone-200 hover:border-stone-300 hover:bg-stone-100/30 transition-all text-left cursor-pointer gap-3 min-h-[48px]">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5 ${addonWhatsapp ? "bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)]" : "border-stone-300 bg-white"}`}>
                        {addonWhatsapp && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-stone-900">Direct WhatsApp API Connection</p>
                        <p className="text-[10px] sm:text-[11px] text-stone-500 font-light leading-relaxed">Instant chat link widgets, automated scheduling alerts, and direct contact points for mobile visitors.</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-600 shrink-0 ml-2 mt-0.5">+1 Day</span>
                  </button>

                  {/* Payment Gateway Addon Toggle */}
                  <button onClick={() => setAddonPayment(!addonPayment)} className="flex items-start justify-between p-5 rounded-xl border bg-stone-50 border-stone-200 hover:border-stone-300 hover:bg-stone-100/30 transition-all text-left cursor-pointer gap-3 min-h-[48px]">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5 ${addonPayment ? "bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)]" : "border-stone-300 bg-white"}`}>
                        {addonPayment && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-stone-900">Secure Payment Gateway Integration</p>
                        <p className="text-[10px] sm:text-[11px] text-stone-500 font-light leading-relaxed">Online payment collection setups supporting global credit cards, local gateways, and receipts.</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-600 shrink-0 ml-2 mt-0.5">+4 Days</span>
                  </button>

                </div>

                {/* Mobile Navigation for Step 2 */}
                <div className="mt-6 flex gap-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileStep(1)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-colors duration-200 text-center"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileStep(3)}
                    className="flex-[2] bg-stone-900 text-stone-50 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-stone-850 transition-colors duration-200"
                  >
                    View Estimate
                    <svg className="w-3.5 h-3.5 stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Outcome Presentation Cluster */}
            <div className={`lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left h-full shadow-[inset_0_1px_1px_rgba(28,25,23,0.01)] hover:border-stone-300 transition-all duration-300 relative ${mobileStep === 3 ? "flex" : "hidden lg:flex"}`}>
              <div>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Summary /</span>
                <p className="text-sm font-semibold text-stone-700 mt-2 mb-6">Runway Breakdown</p>
                <div className="space-y-3.5 mb-6 text-xs font-light border-b border-stone-100 pb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Core Architecture</span>
                    <span className="font-mono text-stone-800 font-medium">{formatRunwayText(baseRunway)}</span>
                  </div>
                  {addonEmail && (
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Email Module</span>
                      <span className="font-mono text-blue-600 font-medium">+2 Days</span>
                    </div>
                  )}
                  {addonWhatsapp && (
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">WhatsApp Module</span>
                      <span className="font-mono text-blue-600 font-medium">+1 Day</span>
                    </div>
                  )}
                  {addonPayment && (
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Payment Gateway</span>
                      <span className="font-mono text-blue-600 font-medium">+4 Days</span>
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-stone-100 mb-6">
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block font-mono mb-3">Project Runway Milestones</span>
                  <div className="flex flex-col gap-3.5">
                    {timelineDates.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs font-light">
                        <div className="flex flex-col items-center shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {idx < timelineDates.length - 1 && <div className="w-px h-6 bg-stone-200 border-dashed" />}
                        </div>
                        <div className="flex-1 flex justify-between items-baseline min-w-0">
                          <span className="text-stone-700 truncate pr-2">{item.label}</span>
                          <span className="text-[10px] font-mono text-stone-500 shrink-0">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-5 flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-blue-600 font-medium font-mono">Estimated Delivery Runway</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <p className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-tight">
                      {formatRunwayText(totalRunwayDays)}
                    </p>
                    <span className="text-[10px] text-stone-500 font-mono">Estimated</span>
                  </div>
                </div>
                <Link href="/contact" className="w-full">
                  <motion.button className="w-full bg-stone-900 text-stone-50 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-stone-850" whileTap={{ scale: 0.99 }}>
                    Contact us about this project
                    <svg className="w-3.5 h-3.5 stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                </Link>

                {/* Mobile Back Button */}
                <div className="mt-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileStep(2)}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-colors duration-200 text-center"
                  >
                    Back to Add-ons
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENT TESTIMONIALS SECTION ─── */}
      <section className="py-12 md:py-20 bg-cosmic-black/25 relative border-t border-stone-200/60 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading and Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-blue-600 font-semibold text-[10px] uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(37,99,235,0.03)] backdrop-blur-md">Reviews</span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mb-4 font-heading leading-tight">What our clients <span className="font-serif italic font-light text-blue-600">actually say.</span></h2>
              <p className="text-stone-600 text-sm leading-relaxed font-light mb-8 max-w-sm">Read raw feedback from regional brands, medical clinic founders, and local businesses.</p>
              
              <div className="w-full max-w-[280px] aspect-[4/3] bg-white border border-stone-200 p-1.5 rounded-[24px] shadow-sm overflow-hidden hidden lg:block">
                <CroppedIllustration panel="top-right" alt="Chatbot Conversation Illustration" />
              </div>
            </div>

            {/* Right Column: Testimonial Card */}
            <div className="lg:col-span-7 w-full">
              <div className="max-w-2xl mx-auto relative">
                <AnimatePresence mode="wait">
                  {testimonials.filter((_, idx) => idx === testimonialIdx).map((testimonial) => (
                    <motion.div
                      key={testimonial.author}
                      drag={testimonials.length >= 3 ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, info) => {
                        if (testimonials.length < 3) return;
                        const swipeThreshold = 55;
                        if (info.offset.x < -swipeThreshold) {
                          setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
                        } else if (info.offset.x > swipeThreshold) {
                          setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
                        }
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden flex flex-col justify-between min-h-[180px] cursor-grab active:cursor-grabbing select-none touch-pan-y text-left py-4"
                    >
                      <div className="absolute top-2 right-4 text-blue-600/10 pointer-events-none">
                        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.988zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-stone-800 text-lg sm:text-xl font-light italic leading-relaxed pr-12 text-left font-heading">
                          "{testimonial.quote}"
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-stone-200/60">
                        <h4 className="font-semibold text-stone-900 text-sm tracking-tight">{testimonial.author}</h4>
                        <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-0.5">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {testimonials.length >= 3 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button onClick={() => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))} className="w-10 h-10 border border-stone-200 bg-stone-50/50 hover:border-stone-300 rounded-xl flex items-center justify-center text-stone-600 hover:text-stone-900 transition-all cursor-pointer text-sm">←</button>
                  <div className="flex gap-1.5">
                    {testimonials.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === testimonialIdx ? 'bg-blue-600 w-3' : 'bg-stone-200'
                          }`}
                      />
                    ))}
                  </div>
                  <button onClick={() => setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))} className="w-10 h-10 border border-stone-200 bg-stone-50/50 hover:border-stone-300 rounded-xl flex items-center justify-center text-stone-600 hover:text-stone-900 transition-all cursor-pointer text-sm">→</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ACCORDION SECTION ─── */}
      <section id="faq" className="py-12 md:py-20 bg-cosmic-black/20 relative border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading and Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left lg:sticky lg:top-24">
              <p className="text-blue-600 font-mono text-[10px] tracking-widest uppercase mb-3">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 mb-4 font-heading leading-tight">Frequently <span className="font-serif italic font-light text-blue-600">asked questions.</span></h2>
              <p className="text-stone-600 text-sm leading-relaxed font-light mb-8 max-w-sm">Clear details on code ownership, SEO setup, and post-launch updates.</p>
              
              <div className="w-full max-w-[280px] aspect-[4/3] bg-white border border-stone-200 p-1.5 rounded-[24px] shadow-sm overflow-hidden hidden lg:block">
                <CroppedIllustration panel="bottom-right" alt="Chatbot Desk Illustration" />
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="lg:col-span-7 w-full">
              <div className="space-y-8">
                {[
                  { q: "Do I own 100% of the code?", a: "Yes, absolutely. Once the project is complete, we transfer full GitHub repository ownership to you. There are no ongoing licensing fees, vendor lock-ins, or monthly site builder subscriptions. You own the code forever." },
                  { q: "What is the typical timeline for a project?", a: "A standard custom business website is delivered in 10 to 14 days. More complex web applications or multi-page systems requiring heavy database integrations typically take 3 to 4 weeks. You will receive a clear, day-by-day milestone delivery roadmap before we start." },
                  { q: "How many rounds of revisions do I get?", a: "We provide unlimited design iterations during the wireframing phase, and up to 3 major revision rounds during the web engineering phase. This guarantees that the final system aligns exactly with your vision and branding." },
                  { q: "How does the regional SEO setup work?", a: "We write valid JSON-LD schemas directly into your site's structure to make sure Google understands exactly what services you offer and where. Combined with near-perfect load times, this ranks you higher locally." },
                  { q: "What kind of post-launch support is included?", a: "We provide 30 days of free post-launch support covering bug fixes, performance monitoring, and server setup. After that, we offer simple hourly rates for updates, or customized monthly retainer maintenance packages to keep your site updated." },
                  { q: "What are your payment terms?", a: "We operate on a 50/50 payment structure: 50% deposit upfront to secure the project slot, and the remaining 50% upon successful delivery and repository ownership transfer. We accept standard bank transfers, UPI, and international credit cards via Stripe." },
                  { q: "What happens if I need changes later?", a: "Everything is built on standard React and Next.js, so any developer can easily edit the code. For updates, you can work with our team on a simple hourly rate or a monthly support contract." }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-stone-200/60 last:border-b-0 pb-8 last:pb-0 text-left">
                    <h3 className="font-semibold text-stone-900 text-sm sm:text-base mb-3 leading-snug">
                      {faq.q}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Transition Divider */}
      <div className="h-24 bg-gradient-to-b from-cosmic-black to-slate-900 pointer-events-none" />

      {/* ─── CONNECT / FINAL CTA ──────────────────────────── */}
      <section className="py-12 md:py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mb-3 font-semibold">Work With Us</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3 font-heading">Let's grow your business <span className="font-serif italic font-light text-blue-600">online.</span></h2>
              <p className="text-stone-400 text-xs sm:text-sm mb-8 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">Ready to build a fast, high-converting business website, launch an online booking or e-commerce storefront, or improve your local search rankings? Get in touch with us.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.button className="w-full sm:w-auto bg-white text-stone-900 font-semibold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:bg-stone-100" whileTap={{ scale: 0.98 }}>
                    Work With Us
                    <svg className="w-3.5 h-3.5 stroke-stone-900 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                </Link>
                <a href="mailto:hello.stackandscale@gmail.com" className="w-full sm:w-auto">
                  <motion.button className="w-full sm:w-auto bg-stone-800 border border-stone-700 text-stone-300 hover:text-white hover:border-blue-500/30 font-medium px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm" whileTap={{ scale: 0.98 }}>
                    Email Our Team
                  </motion.button>
                </a>
              </div>
            </div>

            {/* Right Side: CTA Illustration and Instagram Card */}
            <div className="flex flex-col gap-6">
              <div className="w-full max-w-[340px] aspect-[4/3] bg-stone-850/40 border border-stone-850/60 p-1.5 rounded-[24px] shadow-sm overflow-hidden mx-auto lg:ml-auto lg:mr-0 hidden sm:block">
                <CroppedIllustration panel="bottom-right" alt="Start Your Project Illustration" />
              </div>

              {/* Instagram Profile Card */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <a
                  href="https://www.instagram.com/stack__and__scale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 sm:p-6 bg-stone-800/60 border border-stone-700/60 rounded-2xl hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-3 w-full min-w-0">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-500/15 transition-colors">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                          <span className="font-semibold text-white text-sm sm:text-base font-heading tracking-tight truncate">stack__and__scale</span>
                          <svg className="w-4 h-4 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider font-semibold">Instagram Profile</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-stone-700/60 border border-stone-600 text-stone-300 flex items-center justify-center group-hover:text-white group-hover:border-blue-500/30 transition-all duration-300 shrink-0">
                      <svg className="w-4 h-4 stroke-current stroke-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-stone-950 text-stone-450 border-t border-stone-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left text-stone-500 text-xs md:text-[11px] font-medium tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-stone-900 border border-stone-800 flex items-center justify-center relative overflow-hidden">
              <img src="/icon.png" alt="Stack & Scale Footer Logo" className="w-4.5 h-4.5 object-contain" />
            </div>
            <span className="font-semibold text-sm text-white font-heading tracking-tight">Stack<span className="text-stone-400 font-light">&Scale</span></span>
          </div>
          <span className="font-normal text-stone-500 normal-case">© {new Date().getFullYear()} Stack&Scale. Custom business websites and IT solutions built to grow online.</span>
          <div className="flex items-center gap-6 text-stone-500">
            <a href="mailto:hello.stackandscale@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://wa.me/918421526195" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="https://www.instagram.com/stack__and__scale" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>


      {/* ─── CAPABILITY DETAIL DRAWER (SLIDE-OVER PANEL) ─── */}
      <AnimatePresence>
        {activeServiceDetail && (() => {
          const s = activeServiceDetail;
          return (
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
              <motion.div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveServiceDetail(null)} />
              <motion.div
                className="relative w-full md:max-w-xl bg-cosmic-black border-l border-stone-200 h-full flex flex-col justify-between shadow-2xl z-10 overflow-y-auto custom-scrollbar"
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                drag="x"
                dragConstraints={{ left: 0, right: 1000 }}
                dragElastic={{ left: 0.05, right: 0.5 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 150) {
                    setActiveServiceDetail(null);
                  }
                }}
              >
                <div className="p-6 sm:p-8 border-b border-stone-200 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9.5px] uppercase tracking-wider font-mono font-medium text-blue-600">{s.tag}</span>
                    <h3 className="text-lg font-semibold text-stone-900 font-heading mt-1">{s.title}</h3>
                  </div>
                  <button onClick={() => setActiveServiceDetail(null)} className="w-10 h-10 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-555 hover:text-stone-900 transition-colors cursor-pointer shrink-0 ml-4">✕</button>
                </div>

                <div className="p-6 sm:p-8 flex-1 space-y-8 text-left">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">{s.subtitle}</h4>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">{s.desc}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[9px] uppercase tracking-wider font-mono text-blue-600 block mb-4">Lighthouse Metric Benchmarks</span>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { score: s.lighthouse.perf, title: "Performance" },
                        { score: s.lighthouse.access, title: "Accessibility" },
                        { score: s.lighthouse.best, title: "Best Practices" },
                        { score: s.lighthouse.seo, title: "SEO" }
                      ].map((l, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5">
                          <div className="w-10 h-10 rounded-full border border-stone-200 bg-blue-500/5 flex items-center justify-center">
                            <span className="text-xs font-bold font-mono text-blue-600">{l.score}</span>
                          </div>
                          <span className="text-[8px] uppercase tracking-wider text-stone-500 font-medium">{l.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1.5">Typical Challenge</h5>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">{s.challenge}</p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1.5">Applied Solution</h5>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">{s.solution}</p>
                  </div>

                  <div className="space-y-3 pb-4">
                    <span className="text-[9px] uppercase tracking-wider font-mono text-blue-600 block">Deliverables & Features</span>
                    <div className="space-y-4">
                      {s.deliverables.map((d: string, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start text-xs sm:text-sm">
                          <div className="w-5 h-5 rounded bg-stone-50 border border-stone-200 text-blue-600 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">0{idx + 1}</div>
                          <div>
                            <p className="font-semibold text-stone-900">{d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-stone-200 bg-stone-50/95 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-500">Service Framework Defined</span>
                  <Link href="/contact" onClick={() => setActiveServiceDetail(null)}>
                    <motion.button className="bg-stone-900 text-stone-50 font-semibold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md hover:bg-stone-850" whileTap={{ scale: 0.98 }}>
                      Initiate Project Intake
                      <svg className="w-3.5 h-3.5 stroke-stone-50 stroke-[2.5]" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </main>
  );
}