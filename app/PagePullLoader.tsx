"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';

const PullingCharacter = ({ 
  tension, 
  slack 
}: { 
  tension: any; 
  slack: any; 
}) => {
  // Posture shifts based on rope tension
  const torsoRotate = useTransform(tension, [0, 1, 1.5], [0, -14, -24]);
  const torsoX = useTransform(tension, [0, 1, 1.5], [0, 4, 8]);
  const headRotate = useTransform(tension, [0, 1, 1.5], [0, -8, -16]);
  const headX = useTransform(tension, [0, 1, 1.5], [0, 2, 4]);
  
  const frontArmRotate = useTransform(tension, [0, 1, 1.5], [0, 18, 28]);
  const backArmRotate = useTransform(tension, [0, 1, 1.5], [0, 22, 34]);
  
  const frontLegRotate = useTransform(tension, [0, 1, 1.5], [0, 4, 8]);
  const backLegRotate = useTransform(tension, [0, 1, 1.5], [0, -4, -8]);
  
  // Effort indicators (sweat droplet opacity)
  const sweatOpacity = useTransform(tension, [0.8, 1, 1.5], [0, 0.8, 1]);

  // Secondary Motion: Dangling hoodie drawstrings that react to lean/gravity
  const string1X = useTransform(tension, [0, 1, 1.5], [120, 112, 108]);
  const string1Y = useTransform(tension, [0, 1, 1.5], [128, 126, 124]);
  const string2X = useTransform(tension, [0, 1, 1.5], [123, 115, 110]);
  const string2Y = useTransform(tension, [0, 1, 1.5], [129, 127, 125]);

  return (
    <div className="relative overflow-visible">
      {/* CSS Animation Styles for Sparks and Dust */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spark-1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-35px, -15px) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes spark-2 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-28px, -28px) scale(0) rotate(-120deg); opacity: 0; }
        }
        @keyframes spark-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-45px, -8px) scale(0); opacity: 0; }
        }
        @keyframes dust-puff-1 {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.6; }
          100% { transform: translate(-25px, -5px) scale(2.2); opacity: 0; }
        }
        @keyframes dust-puff-2 {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.5; }
          100% { transform: translate(-18px, -12px) scale(1.8); opacity: 0; }
        }
        .animate-spark-1 { animation: spark-1 0.4s ease-out infinite; }
        .animate-spark-2 { animation: spark-2 0.45s ease-out infinite 0.1s; }
        .animate-spark-3 { animation: spark-3 0.35s ease-out infinite 0.05s; }
        .animate-dust-1 { animation: dust-puff-1 0.5s ease-out infinite; }
        .animate-dust-2 { animation: dust-puff-2 0.6s ease-out infinite 0.12s; }
      `}} />

      {/* Spark/Dust particles near front foot */}
      <motion.div 
        style={{ opacity: useTransform(tension, [0.8, 1], [0, 1]) }}
        className="absolute left-[19px] top-[81px] sm:left-[26px] sm:top-[108px] pointer-events-none"
      >
        {/* Foot Sparks */}
        <span className="absolute w-2.5 h-2.5 bg-amber-400 rounded-full animate-spark-1" />
        <span className="absolute w-2 h-2 bg-orange-400 rounded-full animate-spark-2" />
        <span className="absolute w-3 h-1.5 bg-yellow-300 rounded-full animate-spark-3" />
        {/* Foot Dust puffs */}
        <span className="absolute w-4 h-4 bg-stone-300/30 rounded-full animate-dust-1 blur-[2px]" />
        <span className="absolute w-3 h-3 bg-stone-400/20 rounded-full animate-dust-2 blur-[1px]" />
      </motion.div>
      
      <svg className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-xl overflow-visible" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
          <linearGradient id="skin-shadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#E07A5F" />
          </linearGradient>
          <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="jacket-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="pants" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
          <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
          <linearGradient id="sole" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>

        <ellipse cx="110" cy="205" rx="55" ry="7" fill="rgba(0,0,0,0.18)" />

        <motion.g style={{ transformOrigin: "125px 145px", rotate: backLegRotate }}>
          <path d="M 125 145 L 145 180 L 132 205" stroke="url(#pants)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 132 205 L 118 207 L 115 198 Z" fill="#ffffff" />
          <path d="M 132 205 L 118 207" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
        </motion.g>

        <motion.g style={{ transformOrigin: "125px 145px", rotate: frontLegRotate }}>
          <path d="M 115 145 L 75 175 L 48 202" stroke="url(#pants)" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 48 202 L 32 196 L 34 204 L 50 206 Z" fill="url(#sole)" />
          <path d="M 48 202 L 36 194 C 33 196, 31 199, 32 204 L 50 206 Z" fill="#3B82F6" />
        </motion.g>

        <motion.g style={{ transformOrigin: "125px 145px", rotate: torsoRotate, x: torsoX }}>
          <path d="M 120 145 Q 138 135 130 95 Q 110 105 120 145 Z" fill="url(#jacket)" />
          <path d="M 130 95 Q 110 105 120 145 C 122 145, 124 140, 125 128 Z" fill="url(#jacket-dark)" />
          <path d="M 115 138 C 112 135, 110 128, 115 122 C 122 122, 125 124, 125 130 Z" fill="url(#jacket-dark)" stroke="#3B82F6" strokeWidth="1" />
          <path d="M 128 95 C 138 95, 142 84, 132 78 Z" fill="url(#jacket-dark)" />

          <motion.line x1="120" y1="108" x2={string1X} y2={string1Y} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <motion.line x1="123" y1="108" x2={string2X} y2={string2Y} stroke="#D1D5DB" strokeWidth="2.2" strokeLinecap="round" />
          
          <motion.g style={{ transformOrigin: "125px 92px", rotate: headRotate, x: headX }}>
            <path d="M 122 92 L 120 83 L 128 83 L 127 92 Z" fill="url(#skin-shadow)" />
            <circle cx="124" cy="74" r="3" fill="url(#skin)" />
            <path d="M 120 68 C 113 68, 109 72, 109 76 C 109 78, 111 79, 110 81 C 109 82, 110 84, 113 84 C 116 84, 119 82, 121 78 Z" fill="url(#skin)" />
            <circle cx="114" cy="73" r="1" fill="#1F2937" />
            <path d="M 112 70 L 116 71" stroke="#1F2937" strokeWidth="0.8" />
            <path d="M 120 68 C 118 64, 122 59, 128 59 C 132 59, 134 63, 130 68 Z" fill="url(#hair)" />
            <path d="M 125 59 C 123 54, 129 51, 132 54 C 135 56, 133 61, 128 59 Z" fill="url(#hair)" />

            <motion.path 
              style={{ opacity: sweatOpacity }}
              d="M 107 78 Q 106 82 108 83 Q 109 83 109 81 Z" 
              fill="#38BDF8" 
            />
          </motion.g>

          <motion.g style={{ transformOrigin: "130px 105px", rotate: backArmRotate }}>
            <path d="M 130 105 L 98 116 L 76 100" stroke="url(#jacket-dark)" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="76" cy="100" r="4.5" fill="url(#skin-shadow)" />
          </motion.g>

          <motion.g style={{ transformOrigin: "120px 102px", rotate: frontArmRotate }}>
            <path d="M 120 102 L 88 111 L 66 94" stroke="url(#jacket)" strokeWidth="10.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="66" cy="94" r="5" fill="url(#skin)" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};

export default function PagePullLoader() {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isVibrating, setIsVibrating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const pct = useMotionValue(0); 
  const tension = useMotionValue(0); 
  const slack = useMotionValue(1); 

  useEffect(() => {
    setMounted(true);
    const unsubscribe = tension.on("change", (latest) => {
      setIsVibrating(latest > 0.8);
    });

    if (shouldReduceMotion) {
      // In reduced motion, simply fade out the overlay over 300ms with no translation/pull movement
      const animPct = animate(pct, [0, 120], {
        duration: 0.3,
        ease: "easeOut",
        onComplete: () => {
          setIsLoaderActive(false);
        }
      });
      return () => {
        animPct.stop();
        unsubscribe();
      };
    }

    const duration = 3.2;
    const times = [0, 0.1875, 0.4375, 0.625, 1.0];

    const delayTimer = setTimeout(() => {
      const animPct = animate(pct, [0, 0, 35, 27, 120], {
        times,
        duration,
        ease: [
          "linear",
          [0.25, 1, 0.5, 1],
          [0.36, 0.07, 0.19, 0.97],
          [0.87, 0, 0.13, 1],
        ],
        onComplete: () => {
          setIsLoaderActive(false);
        }
      });

      const animSlack = animate(slack, [1, 0, 0, 0.75, 0], {
        times,
        duration,
        ease: [
          "easeOut",
          "linear",
          "easeOut",
          "linear",
        ]
      });

      const animTension = animate(tension, [0, 1, 1.2, 0.2, 1.5], {
        times,
        duration,
        ease: [
          "easeOut",
          "easeInOut",
          "easeOut",
          "easeOut",
        ]
      });

      return () => {
        animPct.stop();
        animSlack.stop();
        animTension.stop();
      };
    }, 450); 

    return () => {
      clearTimeout(delayTimer);
      unsubscribe();
    };
  }, [pct, slack, tension, shouldReduceMotion]);

  // Compute Page transform styles
  const pageX = 0; // Keep horizontal position fixed
  const pageY = useTransform(pct, (v) => shouldReduceMotion ? "0vh" : `${v}vh`);
  const pageOpacity = useTransform(pct, [0, 120], [1, 0]);
  const pageRotate = useTransform(pct, [0, 35, 120], [0, 1.2, 0.4]); // Subtle swing for loose paper feel

  // Compute Rope Path dynamically
  const ropeD = useTransform([pct, slack], (values: any) => {
    const latestPct = values[0] as number;
    const latestSlack = values[1] as number;
    if (typeof window === 'undefined') return 'M 0 0 L 0 0';
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Rope start point (fixed at top-center of the screen)
    const x1 = vw / 2;
    const y1 = 0;
    
    // Page top-left translation in pixels (X is fixed at 0)
    const py = (latestPct / 100) * vh;
    
    // Hand offset in character SVG (adjusted for container position and scale)
    const isMobile = vw < 640;
    const handOffsetX = isMobile ? (vw / 2 - 22) : (vw / 2 - 29);
    const handOffsetY = isMobile ? -7 : -10;
    
    // Target coordinate (hand position in screen space)
    const x2 = handOffsetX;
    const y2 = py + handOffsetY;
    
    if (latestSlack > 0.05) {
      // Curved sagging rope path (sagging outwards/laterally to the right)
      const midX = (x1 + x2) / 2 + latestSlack * 35;
      const midY = (y1 + y2) / 2 + latestSlack * 50;
      return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
    } else {
      // Tense straight rope path
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
  });

  return (
    <AnimatePresence>
      {isLoaderActive && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* CSS classes for high-performance rope shake */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes rope-shake {
              0%, 100% { transform: translate(0, 0); }
              25% { transform: translate(-0.8px, 0.5px); }
              50% { transform: translate(0.6px, -0.6px); }
              75% { transform: translate(-0.4px, -0.3px); }
            }
            .animate-rope-vibe {
              animation: rope-shake 0.06s linear infinite;
            }
          `}} />
          
          {/* Parent container coordinates of the rope (static, fixed overlay) - client-only render */}
          {mounted && !shouldReduceMotion && (
            <svg className={`absolute inset-0 w-full h-full pointer-events-none z-[9998] overflow-visible ${isVibrating ? 'animate-rope-vibe' : ''}`}>
              {/* Hemp rope base */}
              <motion.path
                d={ropeD}
                stroke="#78350F"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hemp braided highlighting */}
              <motion.path
                d={ropeD}
                stroke="#D97706"
                strokeWidth="3.2"
                strokeDasharray="5,5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}

          {/* Translating White Page Sheet */}
          <motion.div
            style={{ x: pageX, y: pageY, rotate: pageRotate, opacity: pageOpacity }}
            className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-50 shadow-[0_-20px_60px_rgba(0,0,0,0.18)] pointer-events-auto origin-top-left flex flex-col items-center justify-center border-t border-stone-200/50"
          >
            {/* 3D Page Curl effect on top border (acts as the scroll roll-up) */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-stone-200/90 via-stone-100/40 to-transparent pointer-events-none transform -translate-y-[98%] rounded-b-[16px] border-b border-stone-300/20 shadow-[0_10px_15px_rgba(0,0,0,0.05)]" />

            {/* Subtle Brand Logo & Tagline inside the loading sheet */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none select-none">
              {/* Animation CSS style for the thumbs-up emoji */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bounce-subtle {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-4px); }
                }
                .animate-bounce-subtle {
                  display: inline-block;
                  animation: bounce-subtle 1.4s ease-in-out infinite;
                }
              `}} />

              {/* Logo */}
              <div className="flex items-center gap-3 opacity-20">
                <img src="/icon.png" alt="" className="w-10 h-10 object-contain" />
                <span className="font-semibold text-xl tracking-tight text-stone-900 font-heading">
                  Stack<span className="text-stone-500 font-light">&Scale</span>
                </span>
              </div>

              {/* Tagline */}
              <div className="text-center px-6 max-w-sm sm:max-w-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-stone-700/95 font-heading">
                  You are at the right place <span className="animate-bounce-subtle">👍</span>
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Character sitting on top, moving with the page crease */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ x: pageX, y: pageY }}
              className="absolute top-0 left-1/2 z-[9999] pointer-events-none"
            >
              {/* Position character relative to the peeled corner */}
              <div className="absolute -left-[48px] -top-[45px] sm:-left-[64px] -top-[60px]">
                <PullingCharacter tension={tension} slack={slack} />
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
