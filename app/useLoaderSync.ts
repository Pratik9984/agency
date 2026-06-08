"use client";

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    __loaderComplete?: boolean;
  }
}

export function useLoaderSync() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If loader has already finished in this session, trigger animations immediately
    if (window.__loaderComplete) {
      setIsReady(true);
      return;
    }

    // Otherwise, listen for the loader completion event
    const handleComplete = () => {
      setIsReady(true);
    };

    window.addEventListener('loader-complete', handleComplete);

    // Fallback: trigger after 2.5 seconds in case loader is bypassed or fails to fire
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2500);

    return () => {
      window.removeEventListener('loader-complete', handleComplete);
      clearTimeout(timer);
    };
  }, []);

  return isReady;
}
