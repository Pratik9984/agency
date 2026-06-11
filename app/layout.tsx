import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stackandscale.in"),
  title: "Stack and Scale | Web Development Agency Pune",
  description:
    "Stack and Scale is a Pune-based web development and IT solutions agency. We build custom, high-performance websites, web apps, and e-commerce platforms for businesses across India — zero outsourced code.",
  keywords: [
    "web development agency Pune",
    "custom website design Pune",
    "Next.js development India",
    "IT solutions Pune",
    "e-commerce development Pune",
    "React developer Pune",
    "business website Pune",
    "web app development India",
    "SEO agency Pune",
    "UI UX design Pune",
    "SaaS development India",
    "payment gateway integration India",
    "Stack and Scale",
    "stackandscale.in",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "https://www.stackandscale.in",
  },
  openGraph: {
    title: "Stack and Scale | Web Development Agency Pune",
    description:
      "Pune-based web development agency. Custom websites, web apps & e-commerce built in-house — zero outsourced code. Live in 10–14 days.",
    url: "https://www.stackandscale.in",
    siteName: "Stack and Scale",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stack and Scale — Web Development Agency Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack and Scale | Web Development Agency Pune",
    description:
      "Custom websites & web apps built in-house. Pune-based agency. Zero outsourced code. Live in 10–14 days.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Stack and Scale",
  alternateName: ["Stack&Scale", "Stack & Scale"],
  url: "https://www.stackandscale.in",
  logo: "https://www.stackandscale.in/icon.png",
  image: "https://www.stackandscale.in/og-image.png",
  description:
    "Stack and Scale is a Pune-based web development and IT solutions agency. We build custom, high-performance websites, web applications, and e-commerce platforms for businesses across India and globally. In-house team. Zero outsourced code.",
  telephone: "+918421526195",
  email: "hello@stackandscale.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "18.5204",
    longitude: "73.8567",
  },
  areaServed: [
    { "@type": "City", name: "Pune" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Nagpur" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "Country", name: "India" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development & IT Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Website Development",
          description:
            "High-performance custom business websites built with Next.js and React. Optimised for speed, SEO, and conversions. Delivered in 10–14 days.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce Development",
          description:
            "Full-stack e-commerce platforms with Razorpay, Stripe, and UPI payment integration. Inventory management, product catalogs, and fast checkout flows.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Application Development",
          description:
            "Scalable web applications, SaaS dashboards, booking systems, logistics hubs, and custom business portals built with modern frameworks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO & Performance Engineering",
          description:
            "Technical SEO, local SEO, JSON-LD schema implementation, Core Web Vitals optimisation, and sub-second load time engineering.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "Premium, minimal UI/UX design systems, wireframes, and high-fidelity interactive mockups tailored to your brand identity.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Infrastructure & DevOps",
          description:
            "Cloud architecture setup, database design, REST API development, CI/CD pipelines, and enterprise IT system configuration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Membership & Portal Development",
          description:
            "Secure membership portals, client dashboards, invitation-only directory platforms, and subscription-based systems with authentication flows.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Payment Gateway Integration",
          description:
            "Razorpay, Stripe, and UPI payment integration for online stores, booking platforms, and service businesses across India.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "WhatsApp & CRM Integration",
          description:
            "WhatsApp API integration, automated lead routing, client communication pipelines, and CRM system setup for business automation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Speed Optimisation",
          description:
            "Core Web Vitals audits, Lighthouse score improvement, image optimisation, and rendering performance tuning for existing websites.",
        },
      },
    ],
  },
  priceRange: "₹₹",
  openingHours: "Mo-Sa 09:00-19:00",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+918421526195",
    email: "hello@stackandscale.in",
    contactType: "customer support",
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  sameAs: [
    "https://www.instagram.com/stack__and__scale",
  ],
};

import PagePullLoader from "./PagePullLoader";
import { MotionConfig } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-blue-500/10 selection:text-blue-900">
        <MotionConfig reducedMotion="user">
          <PagePullLoader />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
