'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ZLazyLoaderProps {
  onAnimationComplete: () => void;
  onZoomStart?: () => void;
}

export default function ZLazyLoader({ onAnimationComplete, onZoomStart }: ZLazyLoaderProps) {
  const [zoomDone, setZoomDone] = useState(false);
  const [startOutro, setStartOutro] = useState(false);

  useEffect(() => {
    // Hold the cinematic loader for 2.5 seconds before starting the outro zoom
    const timer = setTimeout(() => {
      setStartOutro(true);
      onZoomStart?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onZoomStart]);

  return (
    <AnimatePresence>
      {!zoomDone && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] overflow-hidden"
          style={{ pointerEvents: startOutro ? 'none' : 'auto' }}
          animate={startOutro ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          onAnimationComplete={() => {
            if (startOutro) {
              setZoomDone(true);
              onAnimationComplete();
            }
          }}
        >
          {/* Subtle cinematic ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(202,138,4,0.08) 0%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── The 3D Orbital Scene ── */}
          <motion.div
            className="relative w-64 h-64 flex items-center justify-center perspective-[1000px]"
            animate={
              startOutro
                ? { scale: 15, opacity: 0, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, filter: 'blur(0px)' }
            }
            transition={
              startOutro
                ? { duration: 1.2, ease: [0.5, 0, 0, 1] }
                : { duration: 1.5, ease: 'easeOut' }
            }
          >
            {/* Central Part of the Logo (Static) */}
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-center drop-shadow-[0_0_15px_rgba(202,138,4,0.3)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <img 
                src="/images/dentalist-logo.png" 
                alt="Dentalist Logo Center" 
                className="w-full h-full object-contain dark:invert"
                style={{
                  // Keep only the central part (the tooth/D)
                  maskImage: 'radial-gradient(circle at 50% 50%, black 45%, transparent 48%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 45%, transparent 48%)'
                }}
              />
            </motion.div>

            {/* Outer Part of the Logo (The Ring - Rotating) */}
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <img 
                src="/images/dentalist-logo.png" 
                alt="Dentalist Logo Ring" 
                className="w-full h-full object-contain dark:invert"
                style={{
                  // Keep only the outer part (the ring)
                  maskImage: 'radial-gradient(circle at 50% 50%, transparent 45%, black 48%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 45%, black 48%)'
                }}
              />
            </motion.div>

            {/* Cinematic Center Glow */}
            <motion.div
              className="absolute inset-0 m-auto w-12 h-12 bg-[#D4A017] rounded-full blur-[30px] opacity-20 z-0"
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          
          {/* Subtle text reveal at the bottom */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={startOutro ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="font-display text-[11px] font-bold tracking-[0.4em] uppercase text-[var(--color-gold)]/70">
              Dentalist Clinic
            </span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
