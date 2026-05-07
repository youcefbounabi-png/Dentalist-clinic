'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { useTranslations } from 'next-intl';

export default function VideoHighlightSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Autoplay by default
  const t = useTranslations('HomePage.VideoHighlight');

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[var(--color-stone-light)]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[var(--color-gold)]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">
                  {t('Subtitle')}
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight text-[var(--color-charcoal)] max-w-2xl">
                {t.rich('Title', {
                  born: (chunks) => <span className="text-[var(--color-gold)] italic">{chunks}</span>
                })}
              </h2>
            </div>
            <p className="text-[var(--color-charcoal-muted)] max-w-sm text-lg leading-relaxed pb-3">
              {t('Description')}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl group border border-black/5">
            <video
              ref={videoRef}
              src="/media/promo-video-1.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            
            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-full flex items-center justify-center transform transition-transform hover:scale-110 hover:bg-white/30"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause size={32} className="fill-current" />
                ) : (
                  <Play size={32} className="fill-current ml-2" />
                )}
              </button>
            </div>
            
            {/* Elegant Border Accent */}
            <div className="absolute inset-0 rounded-3xl border shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] pointer-events-none" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
