'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = 'aspect-[4/3]',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rawPosition = useMotionValue(50);
  const position = useSpring(rawPosition, { stiffness: 100, damping: 20 });
  const clipPath = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`);
  const leftPos = useTransform(position, (p) => `${p}%`);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    rawPosition.set((x / rect.width) * 100);
  }, [rawPosition]);

  const handleMouseLeave = useCallback(() => {
    rawPosition.set(50);
  }, [rawPosition]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden select-none shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
    >
      {/* Before (bottom layer) */}
      <div className="absolute inset-0">
        <Image src={beforeSrc} alt={`Before – ${beforeLabel}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-white/80 backdrop-blur-sm text-[var(--color-charcoal)] px-3 py-1.5 rounded-full">
          {beforeLabel}
        </span>
      </div>

      {/* After (clipped top layer) */}
      <motion.div className="absolute inset-0 z-10" style={{ clipPath }}>
        <Image src={afterSrc} alt={`After – ${afterLabel}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest bg-[var(--color-gold)] text-white px-3 py-1.5 rounded-full">
          {afterLabel}
        </span>
      </motion.div>

      {/* Divider line */}
      <motion.div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] z-20 pointer-events-none"
        style={{ left: leftPos }}
      />

      {/* Handle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-center pointer-events-none"
        style={{ left: leftPos }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M8 9l-4 3 4 3M16 9l4 3-4 3"/>
        </svg>
      </motion.div>
    </div>
  );
}
