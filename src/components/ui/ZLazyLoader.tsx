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
          style={{ 
            pointerEvents: startOutro ? 'none' : 'auto',
            willChange: 'opacity'
          }}
          animate={startOutro ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (startOutro) {
              setZoomDone(true);
              onAnimationComplete();
            }
          }}
        >
          {/* Subtle cinematic ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(202,138,4,0.05) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── The 3D Orbital Scene ── */}
          <motion.div
            className="relative w-48 h-48 flex items-center justify-center"
            style={{ willChange: 'transform, opacity' }}
            animate={
              startOutro
                ? { scale: 8, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              startOutro
                ? { duration: 1, ease: [0.4, 0, 0.2, 1] }
                : { duration: 1, ease: 'easeOut' }
            }
          >
            {/* Logo Image */}
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <img 
                src="/images/dentalist-logo.png" 
                alt="Dentalist Logo" 
                className="w-full h-full object-contain dark:invert"
              />
            </motion.div>

            {/* Cinematic Center Glow */}
            <motion.div
              className="absolute inset-0 m-auto w-16 h-16 bg-[#D4A017] rounded-full blur-[40px] opacity-10 z-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          
          {/* Subtle text reveal at the bottom */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={startOutro ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="font-display text-[10px] font-bold tracking-[0.5em] uppercase text-[var(--color-gold)]/60">
              Dentalist Clinic
            </span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
