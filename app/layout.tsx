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
  metadataBase: new URL("https://stackandscale.in"),
  title: "Stack&Scale | IT Solution Agency",
  description: "We build custom, high-performance websites and web applications for businesses to help them grow their business online and optimize operations.",
  keywords: ["IT Solution Agency", "Web Development", "Business Websites", "Next.js Development", "SEO Optimization", "Online Growth", "Stack and Scale"],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Stack&Scale | IT Solution Agency",
    description: "We build custom, high-performance websites and web applications for businesses to help them grow their business online and optimize operations.",
    url: "https://stackandscale.in",
    siteName: "Stack&Scale IT Solutions",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stack&Scale Agency Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack&Scale | IT Solution Agency",
    description: "Custom business websites and IT solutions engineered for online growth.",
  }
};

import PagePullLoader from "./PagePullLoader";
import { MotionConfig } from 'framer-motion';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-blue-500/10 selection:text-blue-900">
        <MotionConfig reducedMotion="user">
          <PagePullLoader />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}