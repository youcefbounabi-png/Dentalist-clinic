'use client';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from '@/components/ui/TextReveal';
import FadeIn from '@/components/ui/FadeIn';
import ParallaxImage from '@/components/ui/ParallaxImage';
import StatCounter from '@/components/sections/StatCounter';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GoldenSandBackground from '@/components/ui/GoldenSandBackground';
import SplashTransformations from '@/components/sections/SplashTransformations';
import { useTranslations } from 'next-intl';
import ZLazyLoader from '@/components/ui/ZLazyLoader';
import VideoHighlightSection from '@/components/sections/VideoHighlightSection';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <ZLazyLoader 
        onZoomStart={() => setLoaded(true)} 
        onAnimationComplete={() => {}} 
      />
      {loaded && <HomePageMain />}
    </>
  );
}

function HomePageMain() {
  const t = useTranslations('HomePage');
  
  const SERVICES = [
    {
      id: 'veneers',
      icon: '✦',
      title: t('Services.Items.veneers.title'),
      desc: t('Services.Items.veneers.desc'),
    },
    {
      id: 'implants',
      icon: '◈',
      title: t('Services.Items.implants.title'),
      desc: t('Services.Items.implants.desc'),
    },
    {
      id: 'whitening',
      icon: '◇',
      title: t('Services.Items.whitening.title'),
      desc: t('Services.Items.whitening.desc'),
    },
    {
      id: 'invisalign',
      icon: '⬡',
      title: t('Services.Items.invisalign.title'),
      desc: t('Services.Items.invisalign.desc'),
    },
    {
      id: 'makeover',
      icon: '✧',
      title: t('Services.Items.makeover.title'),
      desc: t('Services.Items.makeover.desc'),
    },
    {
      id: 'general',
      icon: '◉',
      title: t('Services.Items.general.title'),
      desc: t('Services.Items.general.desc'),
    },
  ];

  const decoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: decoRef,
    offset: ["start end", "end start"]
  });

  const decoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const decoRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <>
      <GoldenSandBackground />

      
      {/* ─── HERO ─── */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden">
        {/* Large editorial background number */}
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[clamp(200px,30vw,400px)] font-bold text-black/[0.04] select-none leading-none pointer-events-none"
        >
          01
        </span>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left: Text */}
          <div className="space-y-8 relative z-10">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[var(--color-gold)]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">
                  {t('Hero.Subtitle')}
                </span>
              </div>
            </FadeIn>

            <TextReveal
              text={t('Hero.Title')}
              tag="h1"
              className="font-display text-[clamp(2.8rem,6vw,5rem)] font-light leading-[1.05] text-[var(--color-charcoal)]"
            />

            <FadeIn delay={0.4}>
              <p className="font-body text-base md:text-lg text-[var(--color-charcoal-muted)] max-w-md leading-relaxed">
                {t('Hero.Description')}
              </p>
            </FadeIn>

            <FadeIn delay={0.5} className="flex flex-wrap gap-4">
              <Link
                href="/contact#booking"
                className="px-8 py-4 bg-[var(--color-charcoal)] text-[var(--button-text-primary)] font-semibold rounded-full hover:bg-[var(--color-gold)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] hover:-translate-y-1 inline-block text-sm tracking-wide"
              >
                {t('Hero.BookBtn')}
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 border border-[var(--color-charcoal)]/20 text-[var(--color-charcoal)] font-semibold rounded-full hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300 inline-block text-sm tracking-wide"
              >
                {t('Hero.ViewTransBtn')}
              </Link>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex items-center gap-2 pt-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold)" className="text-[var(--color-gold)]">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-[var(--color-charcoal-muted)]">
                  <strong className="text-[var(--color-charcoal)]">4.9/5</strong> {t('Hero.FromPatients')}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right: Image with floating cards */}
          <FadeIn delay={0.3} direction="left" className="relative">
            {/* isolation: isolate forces the screen-blend to happen only WITHIN this box */}
            <div className="relative w-full max-w-lg mx-auto aspect-[4/5]" style={{isolation: 'isolate'}}>

              {/* Doctor photo – normal flow, fills the aspect-ratio box */}
              <ParallaxImage speed={0.1} className="rounded-3xl overflow-hidden w-full h-full">
                <Image
                  src="/media/hero-image.png"
                  alt="Dentalist Clinic – Cosmetic Dentist"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </ParallaxImage>

              {/* Gold Ribbon Frame – absolutely on top, screen blend removes black pixels only */}
              <div
                className="absolute inset-0 z-10 pointer-events-none rounded-3xl overflow-hidden"
                style={{mixBlendMode: 'screen'}}
              >
                <Image
                  src="/images/48b881abff4e8cfc43bc65b33faa7b67.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  aria-hidden
                />
              </div>
            </div>

            {/* Floating stat card – top left */}
            <div className="absolute -left-6 top-12 glass rounded-2xl px-6 py-4 shadow-xl hidden md:block z-20">
              <p className="font-display text-3xl font-semibold text-[var(--color-charcoal)]">500+</p>
              <p className="text-xs text-[var(--color-charcoal-muted)] mt-1 font-medium">{t('Hero.SmileTransformations')}</p>
            </div>

            {/* Floating award card – bottom right */}
            <div className="absolute -right-4 bottom-12 glass rounded-2xl px-6 py-4 shadow-xl hidden md:block z-20">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-gold)] text-xl">✦</span>
                <div>
                  <p className="font-semibold text-sm text-[var(--color-charcoal)]">{t('Hero.TopRatedClinic')}</p>
                  <p className="text-xs text-[var(--color-charcoal-muted)]">{t('Hero.AwardsLocation')}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── VIDEO HIGHLIGHT ─── */}
      <VideoHighlightSection />

      {/* ─── STATS BAND ─── */}
      <section className="border-y border-black/5 bg-[var(--color-stone-warm)] py-12">
        <StatCounter />
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <span
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 font-display text-[clamp(160px,25vw,350px)] font-bold text-black/[0.03] select-none leading-none pointer-events-none"
        >
          02
        </span>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-xl mb-20">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[var(--color-gold)]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Services.SectionSubtitle')}</span>
              </div>
            </FadeIn>
            <TextReveal
              text={t('Services.SectionTitle')}
              tag="h2"
              className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-tight text-[var(--color-charcoal)]"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.08} direction="up">
                <Link href={`/services#${service.id}`} className="group block p-8 rounded-2xl border border-black/5 bg-white/50 hover:bg-[var(--color-stone-warm)] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-gold)]/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-[var(--color-gold)] group-hover:w-full transition-all duration-500" />
                  <span className="text-2xl text-[var(--color-gold)] mb-6 block">{service.icon}</span>
                  <h3 className="font-display text-xl font-semibold mb-3 text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed">{service.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--color-charcoal-muted)] group-hover:text-[var(--color-gold)] transition-colors duration-300 uppercase tracking-widest">
                    <span>{t('Services.LearnMore')}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section ref={decoRef} className="py-32 bg-[var(--color-stone-warm)] relative overflow-hidden">
        <div 
          className="absolute left-0 top-0 bottom-0 w-[40%] opacity-12 md:opacity-22 pointer-events-none select-none overflow-hidden"
        >
          <motion.div 
            style={{ 
              y: decoY,
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, black 80%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, black 80%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect'
            }}
            className="absolute -top-[20%] -bottom-[20%] left-0 w-full"
          >
            <Image
              src="/media/tooth-line-art-transparent.png"
              alt=""
              fill
              sizes="100vw"
              className="object-contain object-left scale-[1.5] opacity-60"
            />
          </motion.div>
        </div>



        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[clamp(160px,25vw,350px)] font-bold text-black/[0.04] select-none leading-none pointer-events-none"
        >
          03
        </span>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[var(--color-gold)]" />
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('BeforeAfter.SectionSubtitle')}</span>
                </div>
              </FadeIn>
              <TextReveal
                text={t('BeforeAfter.SectionTitle')}
                tag="h2"
                className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-tight text-[var(--color-charcoal)]"
              />
              <FadeIn delay={0.3}>
                <p className="text-[var(--color-charcoal-muted)] leading-relaxed max-w-md">
                  {t('BeforeAfter.Description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-charcoal)] text-[var(--button-text-primary)] text-sm font-semibold hover:bg-[var(--color-gold)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] hover:-translate-y-1"
                >
                  {t('BeforeAfter.ViewFullGallery')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} direction="left" className="w-full relative z-20">
              <SplashTransformations />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── DOCTOR INTRO ─── */}
      <section id="doctor-section" className="py-32 px-6 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto relative z-10 bg-transparent">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 items-center bg-transparent">
            <FadeIn direction="right" className="bg-transparent">
              <div className="relative group doctor-media-wrapper">
                {/* Main Media Container - Final Structural Fix */}
                <div className="video-container">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  >
                    <source src="/videos/dr-aouetta-intro.mp4" type="video/mp4" />
                  </video>
                </div>

                {/* Circular Spinning Badge - Positioned half-in, half-out on the corner */}
                <div className="absolute -left-8 -top-8 w-[130px] h-[130px] hidden md:block z-30 drop-shadow-2xl pointer-events-none">
                  {/* Rotating Text */}
                  <div className="w-full h-full animate-[spin_12s_linear_infinite]">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      <path
                        id="circularText"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                        fill="none"
                      />
                      <text className="font-display text-[14px] font-bold tracking-[0.2em] fill-[var(--color-gold)] uppercase">
                        <textPath href="#circularText" startOffset="0%">
                          {t('Doctor.CircularText')}
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  {/* Inner Static Jewel */}
                  <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[var(--color-gold)]/80 blur-[1px] shadow-[0_0_20px_var(--color-gold)]" />
                </div>
              </div>
            </FadeIn>
            <div className="space-y-8">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[var(--color-gold)]" />
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Doctor.SectionSubtitle')}</span>
                </div>
              </FadeIn>
              <TextReveal
                text={t('Doctor.SectionTitle')}
                tag="h2"
                className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-tight text-[var(--color-charcoal)]"
              />
              <FadeIn delay={0.3}>
                <p className="text-[var(--color-charcoal-muted)] leading-relaxed">
                  {t('Doctor.Description1')}
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <p className="text-[var(--color-charcoal-muted)] leading-relaxed">
                  {t('Doctor.Description2')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4} className="pt-4 grid grid-cols-3 gap-4">
                {[
                  { num: '18+', label: t('Doctor.Stat1Label') },
                  { num: '500+', label: t('Doctor.Stat2Label') },
                  { num: '12', label: t('Doctor.Stat3Label') },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-[var(--color-stone-warm)]">
                    <p className="font-display text-2xl font-semibold text-[var(--color-charcoal)]">{stat.num}</p>
                    <p className="text-xs text-[var(--color-charcoal-muted)] mt-1 font-medium">{stat.label}</p>
                  </div>
                ))}
              </FadeIn>
              <FadeIn delay={0.5}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors uppercase tracking-widest group"
                >
                  {t('Doctor.FullBiography')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-32 bg-[var(--color-stone-warm)] relative overflow-hidden">
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[clamp(160px,25vw,350px)] font-bold text-black/[0.04] select-none leading-none pointer-events-none"
        >
          05
        </span>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-xl mb-16">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[var(--color-gold)]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Testimonials.SectionSubtitle')}</span>
              </div>
            </FadeIn>
            <TextReveal
              text={t('Testimonials.SectionTitle')}
              tag="h2"
              className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-tight text-[var(--color-charcoal)]"
            />
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl bg-[var(--color-stone-warm)] border border-[var(--color-gold)]/20 p-12 md:p-20 text-center relative overflow-hidden">
              {/* Gold accent lines */}
              <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
              <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-[var(--color-gold)] to-transparent" />

              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-6">{t('CTA.Subtitle')}</p>
              <TextReveal
                text={t('CTA.Title')}
                tag="h2"
                className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-[var(--color-charcoal)] mb-8"
              />
              <FadeIn delay={0.3}>
                <p className="text-[var(--color-charcoal-muted)] max-w-lg mx-auto mb-10 leading-relaxed">
                  {t('CTA.Description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact#booking"
                  className="px-10 py-5 bg-[var(--color-charcoal)] text-[var(--button-text-primary)] font-semibold rounded-full hover:bg-[var(--color-gold)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] hover:-translate-y-1 text-sm tracking-wide"
                >
                  {t('CTA.BookBtn')}
                </Link>
                <a
                  href="tel:+12345678900"
                  className="px-10 py-5 border border-[var(--color-charcoal)]/20 text-[var(--color-charcoal)] font-semibold rounded-full hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300 text-sm tracking-wide"
                >
                  {t('CTA.CallBtn')}
                </a>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
