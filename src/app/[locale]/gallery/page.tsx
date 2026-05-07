'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import TextReveal from '@/components/ui/TextReveal';
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider';
import { useTranslations } from 'next-intl';

export default function GalleryPage() {
  const t = useTranslations('GalleryPage');
  const tHome = useTranslations('HomePage.Services.Items'); // Reusing category names from home services
  
  const categories = [
    { id: 'all', label: t('Categories.all') },
    { id: 'veneers', label: t('Categories.veneers') },
    { id: 'implants', label: t('Categories.implants') },
    { id: 'whitening', label: t('Categories.whitening') },
    { id: 'invisalign', label: t('Categories.invisalign') },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const galleryItems = [
    { id: 1, catId: 'makeover', before: '/images/slider-before.png', after: '/images/slider-after.png', label: 'Complete Transformation', className: 'aspect-[2/1]' },
    { id: 2, catId: 'veneers', before: '/media/slider-1-before.png', after: '/media/slider-1-after.png', label: 'Porcelain Veneers', className: 'aspect-[2/1]' },
    { id: 3, catId: 'implants', before: '/media/slider-2-before.png', after: '/media/slider-2-after.png', label: 'Dental Implants', className: 'aspect-[2/1]' },
    { id: 4, catId: 'whitening', before: '/media/slider-3-before.png', after: '/media/slider-3-after.png', label: 'Professional Whitening', className: 'aspect-[2/1]' },
    { id: 5, catId: 'makeover', before: '/media/slider-4-before.png', after: '/media/slider-4-after.png', label: 'Full Arch Restoration', className: 'aspect-[2/1]' },
  ];

  const filtered = activeCategory === 'all' ? galleryItems : galleryItems.filter(i => i.catId === activeCategory);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-12 pb-24 px-6 relative overflow-hidden">
        <span aria-hidden className="absolute right-0 top-0 font-display text-[clamp(200px,25vw,350px)] font-bold text-black/[0.03] select-none leading-none pointer-events-none">GLR</span>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[var(--color-gold)]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Hero.Subtitle')}</span>
            </div>
          </FadeIn>
          <TextReveal text={t('Hero.Title')} tag="h1" className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[1.0] text-[var(--color-charcoal)] max-w-3xl mb-8" />
          <FadeIn delay={0.4}>
            <p className="text-[var(--color-charcoal-muted)] max-w-xl leading-relaxed text-lg">
              {t('Hero.Description')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── FILTERS ─── */}
      <section className="pb-8 px-6 sticky top-24 z-30 bg-[var(--color-stone-light)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-charcoal)] text-[var(--button-text-primary)]'
                  : 'bg-[var(--color-stone-warm)] text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── GALLERY GRID ─── */}
      <section className="py-12 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="rounded-2xl overflow-hidden border border-black/5 bg-white">
                    <BeforeAfterSlider
                      beforeSrc={item.before}
                      afterSrc={item.after}
                      beforeLabel={t('Labels.before')}
                      afterLabel={t('Labels.after')}
                      className={item.className}
                    />
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)] mb-1">
                        {item.catId === 'makeover' ? tHome('makeover.title') : tHome(`${item.catId}.title`)}
                      </p>
                      <p className="font-display text-lg font-light text-[var(--color-charcoal)]">
                        {item.catId === 'makeover' ? tHome('makeover.title') : tHome(`${item.catId}.title`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
