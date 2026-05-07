'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxImage({ children, speed = 0.3, className = '' }: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div 
        style={{ y }} 
        className="w-full h-full relative"
        initial={false}
      >
        {children}
      </motion.div>
    </div>
  );
}
