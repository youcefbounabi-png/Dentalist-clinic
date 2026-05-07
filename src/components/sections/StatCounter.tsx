'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatCounter() {
  const t = useTranslations('HomePage.StatCounter');

  const stats = [
    { value: 500, suffix: '+', label: t('Transformations') },
    { value: 18, suffix: '+', label: t('Excellence') },
    { value: 99, suffix: '%', label: t('Satisfaction') },
    { value: 12, suffix: '', label: t('Awards') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-display text-4xl md:text-5xl font-light text-[var(--color-charcoal)] mb-2">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-charcoal-muted)] font-semibold">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
