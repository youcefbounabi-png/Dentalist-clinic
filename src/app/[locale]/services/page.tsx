import { Link } from '@/i18n/routing';
import Image from 'next/image';
import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';
import TextReveal from '@/components/ui/TextReveal';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Our Services | Dentalist Clinic',
  description: 'Explore the premium dental treatments at Dentalist Clinic. Specialized in veneers, implants, whitening, and full smile makeovers.',
};

const SERVICE_IDS = ['veneers', 'implants', 'whitening', 'invisalign', 'makeover', 'general'] as const;

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');

  const services = SERVICE_IDS.map((id) => {
    // Icons and images remain constant across languages
    const constants = {
      veneers: { icon: '✦', image: '/media/veneers-final.png' },
      implants: { icon: '◈', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=85' },
      whitening: { icon: '◇', image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=85' },
      invisalign: { icon: '⬡', image: '/media/invisalign-new.png' },
      makeover: { icon: '✧', image: '/media/smile-makeover.jpg' },
      general: { icon: '◉', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=85' },
    }[id];

    return {
      id,
      title: t(`Items.${id}.title`),
      subtitle: t(`Items.${id}.subtitle`),
      description: t(`Items.${id}.description`),
      features: t.raw(`Items.${id}.features`) as string[],
      ...constants,
    };
  });

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-12 pb-24 px-6 relative overflow-hidden">
        <span aria-hidden className="absolute right-0 top-0 font-display text-[clamp(200px,30vw,400px)] font-bold text-black/[0.03] select-none leading-none pointer-events-none">SVC</span>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[var(--color-gold)]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Hero.Subtitle')}</span>
            </div>
          </FadeIn>
          <TextReveal
            text={t('Hero.Title')}
            tag="h1"
            className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[1.0] text-[var(--color-charcoal)] max-w-2xl mb-8"
          />
          <FadeIn delay={0.4}>
            <p className="text-[var(--color-charcoal-muted)] max-w-xl leading-relaxed text-lg">
              {t('Hero.Description')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── SERVICES LIST ─── */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.05}>
              <div id={service.id} className="grid lg:grid-cols-[1fr_1.8fr] gap-0 rounded-3xl overflow-hidden border border-black/5 bg-white/50 hover:border-[var(--color-gold)]/20 transition-all duration-500 group">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                  <span className="absolute top-6 left-6 text-2xl text-white drop-shadow-lg">{service.icon}</span>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-px bg-[var(--color-gold)]" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">{service.subtitle}</p>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-4">{service.title}</h2>
                  <p className="text-[var(--color-charcoal-muted)] leading-relaxed mb-8">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-charcoal-muted)]">
                        <span className="w-4 h-4 rounded-full bg-[var(--color-stone-warm)] flex items-center justify-center text-[var(--color-gold)] text-xs flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact#booking"
                    className="self-start px-7 py-3.5 bg-[var(--color-charcoal)] text-[var(--button-text-primary)] text-sm font-semibold rounded-full hover:bg-[var(--color-gold)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] hover:-translate-y-0.5"
                  >
                    {t('BookBtn')}
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 bg-[var(--color-stone-warm)]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">{t('CTA.Subtitle')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[var(--color-charcoal)] mb-6">{t('CTA.Title')}</h2>
            <p className="text-[var(--color-charcoal-muted)] mb-10 leading-relaxed">{t('CTA.Description')}</p>
            <Link href="/contact#booking" className="px-10 py-5 bg-[var(--color-charcoal)] text-[var(--button-text-primary)] font-semibold rounded-full hover:bg-[var(--color-gold)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] hover:-translate-y-1 text-sm">
              {t('CTA.BookBtn')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
