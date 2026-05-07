'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = useTranslations('HomePage.Testimonials.Items');

  const testimonials = [
    {
      id: 'sarah',
      name: t('sarah.name'),
      treatment: t('sarah.treatment'),
      text: t('sarah.text'),
      rating: 5,
      avatar: 'S',
    },
    {
      id: 'karim',
      name: t('karim.name'),
      treatment: t('karim.treatment'),
      text: t('karim.text'),
      rating: 5,
      avatar: 'K',
    },
    {
      id: 'sofia',
      name: t('sofia.name'),
      treatment: t('sofia.treatment'),
      text: t('sofia.text'),
      rating: 5,
      avatar: 'S',
    },
    {
      id: 'ahmed',
      name: t('ahmed.name'),
      treatment: t('ahmed.treatment'),
      text: t('ahmed.text'),
      rating: 5,
      avatar: 'A',
    },
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
      {/* Navigation */}
      <div className="space-y-3">
        {testimonials.map((testi, i) => (
          <button
            key={testi.id}
            onClick={() => setActive(i)}
            className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
              active === i
                ? 'bg-white border-[var(--color-gold)]/30 shadow-md'
                : 'bg-transparent border-transparent hover:bg-white/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${active === i ? 'bg-[var(--color-gold)] text-white' : 'bg-[var(--color-stone-warm)] text-[var(--color-charcoal-muted)]'}`}>
                {testi.avatar}
              </div>
              <div>
                <p className={`font-semibold text-sm transition-colors ${active === i ? 'text-[var(--color-charcoal)]' : 'text-[var(--color-charcoal-muted)]'}`}>{testi.name}</p>
                <p className="text-xs text-[var(--color-charcoal-muted)]">{testi.treatment}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Active testimonial */}
      <FadeIn>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-black/5"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-gold)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>

            {/* Large open-quote */}
            <p className="font-display text-[5rem] leading-none text-[var(--color-gold)]/20 -mt-4 mb-2 select-none">&ldquo;</p>

            <p className="font-display text-2xl md:text-3xl font-light leading-snug text-[var(--color-charcoal)] mb-10">
              {testimonials[active].text}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-black/5">
              <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-white font-bold text-lg">
                {testimonials[active].avatar}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-charcoal)]">{testimonials[active].name}</p>
                <p className="text-xs uppercase tracking-widest text-[var(--color-gold)]">{testimonials[active].treatment}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </FadeIn>
    </div>
  );
}
