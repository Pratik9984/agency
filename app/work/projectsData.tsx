import React from 'react';

export interface Project {
  id: number;
  slug: string;
  type: string;
  title: string;
  label: string;
  desc: string;
  tech: string[];
  mockup: React.ReactNode;
  subtitle: string;
  challenge: string;
  solution: string;
  specs: { label: string; val: string }[];
  blueprint: { step: string; detail: string }[];
  liveUrl?: string;
}

export const portfolioProjects: Project[] = [
  {
    id: 1,
    slug: "unique-rentals",
    type: "local-growth",
    title: "Unique Car Rentals",
    label: "Mobility & Rental Platforms",
    desc: "A premium vehicle rental and chauffeur platform serving Pune, Mumbai, and Goa. Features two distinct booking modes (Self-Drive & Taxi), interactive step roadmaps, and custom fleet galleries.",
    liveUrl: "https://car-rental-eight-ruby.vercel.app/",
    tech: ["Next.js App", "Tailwind CSS", "Framer Motion", "Razorpay API"],
    subtitle: "Elite Self-Drive & Luxury Chauffeur Mobility Portal",
    challenge: "Structuring a fluid dual-mode conversion funnel (Self-Drive vs. Taxi) while maintaining an ultra-premium aesthetic with fast media load times.",
    solution: "Built a dynamic state-driven layout with instant UI mode switches, structured lazy-loading for heavy vehicle media, and integrated a flat-rate pricing schema.",
    specs: [
      { label: "Booking Modes", val: "Self-Drive / Taxi" },
      { label: "Payment Flow", val: "Razorpay Ready" },
      { label: "Media Strategy", val: "Lazy Fleet Grid" },
      { label: "Delivery Stage", val: "Prototype QA" }
    ],
    blueprint: [
      { step: "Dual-Mode Routing Engine", detail: "Developed custom React state managers that swap between Self-Drive (deposit validation) and Taxi (zero-liability fuel-included) interfaces instantly." },
      { step: "Lazy-Loaded Fleet Grid", detail: "Configured intersection-observed image loading and dynamic compression pipelines for high-definition vehicle assets." }
    ],
    mockup: (
      <div className="w-full h-full bg-[#f5f5f7] relative overflow-hidden flex flex-col border border-stone-200 rounded-2xl">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white border-b border-stone-200/60 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[9px] text-stone-500 font-mono ml-4 select-none">car-rental-eight-ruby.vercel.app</span>
        </div>
        {/* Browser Content */}
        <div className="flex-1 w-full overflow-hidden relative bg-[#f5f5f7]">
          <img 
            src="/unique.png" 
            alt="Unique Car Rentals Live Interface" 
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />
        </div>
      </div>
    )
  },
  {
    id: 2,
    slug: "tradeguru-academy",
    type: "brand-hubs",
    title: "Trade Guru Academy",
    label: "EdTech & Subscription Platforms",
    desc: "A subscription-based trading education platform featuring real-time market intelligence, live charting updates, automated student alerts, and direct WhatsApp course consultant routing.",
    liveUrl: "https://trading-lake-seven.vercel.app/",
    tech: ["Next.js App", "Tailwind CSS", "Framer Motion", "WhatsApp API"],
    subtitle: "Interactive Trading Education & Charting Portal",
    challenge: "Architecting a highly engaging student landing point with live simulated order streams and seamless communication flows to maximize enrollment conversions.",
    solution: "Developed a custom responsive layout with high-fidelity SVG interactive price charts, localized SEO variables, and a sticky WhatsApp consultant prompt.",
    specs: [
      { label: "Lead Channel", val: "WhatsApp Intake" },
      { label: "Chart Layer", val: "SVG Prototype" },
      { label: "Content Model", val: "Course Funnel" },
      { label: "Delivery Stage", val: "Prototype QA" }
    ],
    blueprint: [
      { step: "Interactive Chart Mockups", detail: "Engineered lightweight vector SVG charting layers representing XAUUSD live analysis setups." },
      { step: "Intake Conversation Funnel", detail: "Programmed persistent WhatsApp consultant action prompts to connect users directly with course mentors." }
    ],
    mockup: (
      <div className="w-full h-full bg-[#131110] relative overflow-hidden flex flex-col border border-stone-850 rounded-2xl">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#181615] border-b border-stone-800/60 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[9px] text-[#A39E98] font-mono ml-4 select-none">trading-lake-seven.vercel.app</span>
        </div>
        {/* Browser Content */}
        <div className="flex-1 w-full overflow-hidden relative bg-[#131110]">
          <img 
            src="/tradeguru.png" 
            alt="Trade Guru Academy Live Interface" 
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />
        </div>
      </div>
    )
  },
  {
    id: 3,
    slug: "obsidian-membership",
    type: "brand-hubs",
    title: "Obsidian Private Membership",
    label: "Private Networks & Membership Portals",
    desc: "A highly secure, invitation-only membership portal and directory for a curated private network. Features Supabase identity flows, animated membership status indicators, and member database indexes.",
    liveUrl: "https://raj-nine-delta.vercel.app/",
    tech: ["React App", "Tailwind CSS", "Framer Motion", "Supabase DB"],
    subtitle: "Exclusive Private Invitation & Member Directory Portal",
    challenge: "Constructing a secure, zero-friction application intake pipeline and animated landing interface with instant state transitions using lightweight serverless databases.",
    solution: "Configured real-time security rules in Supabase, built dynamic member verification pipelines, and engineered elegant CSS micro-animations and slide flows for step-based registration.",
    specs: [
      { label: "Access Model", val: "Invite Only" },
      { label: "Identity Layer", val: "Supabase Auth" },
      { label: "Data Scope", val: "Member Directory" },
      { label: "Delivery Stage", val: "Prototype QA" }
    ],
    blueprint: [
      { step: "Invitation Verification Node", detail: "Configured lightweight cryptographic token filters inside serverless database schemas to ensure invitation authenticity." },
      { step: "Dynamic Transition Slides", detail: "Developed smooth page sliding components using framer-motion to guide applicants through registration and verification." }
    ],
    mockup: (
      <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col border border-stone-850 rounded-2xl">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0a0a0a] border-b border-stone-900 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[9px] text-stone-600 font-mono ml-4 select-none">raj-nine-delta.vercel.app</span>
        </div>
        {/* Browser Content */}
        <div className="flex-1 w-full overflow-hidden relative bg-[#050505]">
          <img 
            src="/obsidian.png" 
            alt="Obsidian Private Membership Live Interface" 
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />
        </div>
      </div>
    )
  }
];
