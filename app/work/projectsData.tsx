"use client";

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
  lighthouse: {
    perf: number;
    access: number;
    best: number;
    seo: number;
  };
  metrics: { label: string; val: string }[];
  blueprint: { step: string; detail: string }[];
}

export const portfolioProjects: Project[] = [
  {
    id: 1,
    slug: "tradeguru-telemetry",
    type: "engines",
    title: "TradeGuru Telemetry",
    label: "Operations & SaaS Apps",
    desc: "A custom real-time trading analytics dashboard with active WebSocket streams, lightweight visual rendering, and automated report logs.",
    tech: ["Next.js Core", "Recharts", "WebSocket API"],
    subtitle: "Real-time Telemetry Analytics System",
    challenge: "Syncing active order streams and visual chart indices without causing UI thread bottlenecks under high update rates.",
    solution: "Designed a lightweight update pipeline and decoupled WebSocket listeners from main rendering states, maintaining steady 60fps responsiveness.",
    lighthouse: { perf: 100, access: 98, best: 100, seo: 100 },
    metrics: [
      { label: "First Contentful Paint (FCP)", val: "0.3s" },
      { label: "Largest Contentful Paint (LCP)", val: "0.8s" },
      { label: "Data Update Stream Rate", val: "60 FPS" },
      { label: "Asset Payload Optimization", val: "-55%" }
    ],
    blueprint: [
      { step: "Edge Request Routing", detail: "Vercel edge functions catch WebSocket handshakes and handle initial load requests near the client." },
      { step: "Decoupled Store Update", detail: "Telemetry updates only refresh the exact cell elements instead of triggering full chart redraws." }
    ],
    mockup: (
      <div className="w-full h-full bg-stone-50 p-6 relative overflow-hidden flex flex-col justify-between select-none">
        <div className="flex justify-between items-center pb-2 border-b border-stone-200/40 text-[10px] text-stone-555 font-mono">
          <span>tradeguru_telemetry (Benchmark at Launch)</span>
          <span className="text-stone-500">Static Simulation</span>
        </div>
        <div className="flex flex-col gap-1 my-auto text-left">
          <p className="text-blue-600 text-[9px] uppercase tracking-wider font-semibold">Volume (Launch Test)</p>
          <p className="text-xl font-bold text-stone-900 tracking-tight">4,812 Trades <span className="text-[11px] font-normal font-mono text-stone-500">Static Audit</span></p>
          <svg className="w-full h-14 overflow-visible mt-2" viewBox="0 0 100 40">
            <path d="M0,35 Q15,20 30,28 T60,5 T90,12 T100,10 L100,40 L0,40 Z" fill="rgba(37,99,235,0.02)" />
            <path d="M0,35 Q15,20 30,28 T60,5 T90,12 T100,10" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    )
  },
  {
    id: 2,
    slug: "lotus-health-portal",
    type: "brand-hubs",
    title: "Lotus Health Portal",
    label: "Brand Hubs",
    desc: "A clean, high-performance website for a medical clinic. Features doctor slot reservation forms, patient intake pipelines, and direct local SEO indexes.",
    tech: ["Static Next.js", "Tailwind CSS", "Calendar API"],
    subtitle: "Clinical Intake & Scheduling Portal",
    challenge: "Standard medical booking widgets caused page shifts (CLS) and loaded heavy stylesheets, causing prospective patients to leave the site.",
    solution: "Developed a custom booking flow using static rendering blocks and lightweight client-side verification to remove shifts completely.",
    lighthouse: { perf: 98, access: 100, best: 98, seo: 100 },
    metrics: [
      { label: "Main Thread Delay Time", val: "12ms" },
      { label: "Booking Flow Latency", val: "0ms" },
      { label: "Media Size Compression Index", val: "-72%" },
      { label: "Appointment Load Speed", val: "16ms" }
    ],
    blueprint: [
      { step: "Layout Primitives Alignment", detail: "Form elements load with fixed dimensions to guarantee zero shift during scheduling flow." }
    ],
    mockup: (
      <div className="w-full h-full bg-stone-50 p-6 relative overflow-hidden flex flex-col justify-between select-none">
        <div className="flex justify-between items-center text-[10px] text-stone-555 font-mono">
          <span>lotus_clinic_performance (Verified at Launch)</span>
          <span>Lighthouse Audit</span>
        </div>
        <div className="my-auto text-center flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full border border-stone-200 relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-stone-600 font-mono uppercase">Lighthouse Score: 100</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    slug: "apex-logistics-hub",
    type: "local-growth",
    title: "Apex Logistics Hub",
    label: "Local Businesses",
    desc: "A search-engine optimized landing point and service route directory for a logistics company. Achieves a 99+ score in all Lighthouse audits.",
    tech: ["Next.js App", "JSON-LD Schemas", "Google Maps API"],
    subtitle: "Optimized Regional Service Portal",
    challenge: "The firm's prior site loaded heavy media files and lacked structured metadata schemas, hurting regional Google search visibility.",
    solution: "Configured JSON-LD local business profiles, built automated static sitemaps, and edge-routed all static assets for instant load speeds.",
    lighthouse: { perf: 100, access: 100, best: 100, seo: 100 },
    metrics: [
      { label: "Schema Discovery Index", val: "100/100" },
      { label: "Inbound Lead Conversions Increase", val: "+44.2%" },
      { label: "Average Page Speed Paint", val: "0.9s" },
      { label: "Bundle Overhead Reduction", val: "-68%" }
    ],
    blueprint: [
      { step: "Schema Optimization Flow", detail: "Valid structured schemas serve local service markers directly to search engine crawlers during initial requests." }
    ],
    mockup: (
      <div className="w-full h-full bg-stone-50 p-6 relative overflow-hidden flex flex-col justify-between select-none">
        <div className="flex justify-between items-center text-[10px] text-stone-555 font-mono">
          <span>apex_logistics_vitals (Audited at Launch)</span>
          <span>Core Web Vitals</span>
        </div>
        <div className="flex items-center justify-between gap-4 my-auto text-left">
          <div className="flex-1 flex flex-col">
            <span className="text-[9px] font-semibold text-stone-500 tracking-wider uppercase">REGIONAL TARGETS</span>
            <p className="text-sm font-semibold text-stone-900 mt-0.5">Core Vitals Passed</p>
            <span className="text-xs text-blue-600 font-mono mt-1">LCP: 0.4s (Measured at launch)</span>
          </div>
        </div>
      </div>
    )
  }
];
