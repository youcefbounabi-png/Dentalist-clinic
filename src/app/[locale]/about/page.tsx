import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';
import TextReveal from '@/components/ui/TextReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'About Dr. Aouetta | Dentalist Clinic',
  description: 'Meet Dr. Aouetta Med Saleh — a cosmetic dentist specialized in transforming smiles in Blida.',
};

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  const credentials = [
    { label: t('Doctor.Credentials.specialization_label', { defaultMessage: 'Specialisation' }), value: t('Doctor.Credentials.specialization') },
    { label: t('Doctor.Credentials.location_label', { defaultMessage: 'Location' }), value: t('Doctor.Credentials.location') },
    { label: t('Doctor.Credentials.clinic_label', { defaultMessage: 'Clinic' }), value: t('Doctor.Credentials.clinic') },
  ];

  const values = [
    { title: t('Philosophy.Values.artistry.title'), desc: t('Philosophy.Values.artistry.desc') },
    { title: t('Philosophy.Values.pain.title'), desc: t('Philosophy.Values.pain.desc') },
    { title: t('Philosophy.Values.vision.title'), desc: t('Philosophy.Values.vision.desc') },
    { title: t('Philosophy.Values.results.title'), desc: t('Philosophy.Values.results.desc') },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-12 pb-24 px-6 relative overflow-hidden">
        <span aria-hidden className="absolute right-0 top-0 font-display text-[clamp(200px,30vw,400px)] font-bold text-black/[0.03] select-none leading-none pointer-events-none">DR</span>
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
            className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[1.0] text-[var(--color-charcoal)] max-w-3xl mb-8"
          />
        </div>
      </section>

      {/* ─── DOCTOR SECTION ─── */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
            <FadeIn direction="right">
              <div className="relative sticky top-32">
                <ParallaxImage speed={0.06} className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                  <Image
                    src="/images/dr-aouetta-profile.jpg"
                    alt={`${t('Doctor.Name')} – Cosmetic Dentist`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center scale-110 hover:scale-105 transition-transform duration-1000"
                    priority
                  />
                </ParallaxImage>
                <div className="absolute -bottom-6 -right-4 glass rounded-2xl p-6 shadow-xl">
                  <p className="font-display text-2xl font-semibold text-[var(--color-charcoal)]">{t('Doctor.Name')}</p>
                  <p className="text-xs text-[var(--color-gold)] font-semibold uppercase tracking-widest mt-1">{t('Doctor.Role')}</p>
                  <p className="text-xs text-[var(--color-charcoal-muted)] mt-2">{t('Doctor.Location')}</p>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-12">
              <div className="space-y-6">
                <TextReveal
                  text={t('Doctor.BioTitle')}
                  tag="h2"
                  className="font-display text-4xl md:text-5xl font-light leading-tight text-[var(--color-charcoal)]"
                />
                <FadeIn delay={0.3}>
                  <p className="text-[var(--color-charcoal-muted)] leading-relaxed">
                    {t('Doctor.BioP1')}
                  </p>
                </FadeIn>
                <FadeIn delay={0.35}>
                  <p className="text-[var(--color-charcoal-muted)] leading-relaxed">
                    {t('Doctor.BioP2')}
                  </p>
                </FadeIn>
              </div>

              {/* Credentials */}
              <FadeIn delay={0.4}>
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-charcoal)] mb-6">{t('Doctor.Qualifications')}</h3>
                  {[
                    { l: t('Navbar.About'), v: t('Doctor.Credentials.specialization') }, // Using Navbar.About as placeholder for label if needed, but better use direct keys
                    { l: t('HomePage.Hero.AwardsLocation'), v: t('Doctor.Credentials.location') },
                    { l: 'Clinic', v: t('Doctor.Credentials.clinic') }
                  ].map((c, i) => (
                    <div key={i} className="grid grid-cols-[120px_1fr] gap-4 py-4 border-t border-black/5">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">{[t('Doctor.Credentials.specialization_label', {defaultMessage: 'Specialisation'}), t('Doctor.Credentials.location_label', {defaultMessage: 'Location'}), t('Doctor.Credentials.clinic_label', {defaultMessage: 'Clinic'})][i]}</span>
                      <span className="text-sm text-[var(--color-charcoal-muted)]">{c.v}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Stats */}
              <FadeIn delay={0.5}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { n: '18+', l: t('AboutPage.Doctor.Stats.years') },
                    { n: '500+', l: t('AboutPage.Doctor.Stats.smiles') },
                    { n: '12', l: t('AboutPage.Doctor.Stats.awards') },
                  ].map((s) => (
                    <div key={s.l} className="text-center p-5 rounded-2xl bg-[var(--color-stone-warm)]">
                      <p className="font-display text-3xl font-light text-[var(--color-charcoal)]">{s.n}</p>
                      <p className="text-xs uppercase tracking-widest text-[var(--color-charcoal-muted)] font-semibold mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-32 px-6 bg-[var(--color-stone-warm)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-20">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[var(--color-gold)]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Philosophy.Subtitle')}</span>
              </div>
            </FadeIn>
            <TextReveal text={t('Philosophy.Title')} tag="h2" className="font-display text-4xl md:text-5xl font-light leading-tight text-[var(--color-charcoal)]" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="p-8 rounded-3xl bg-white border border-black/5 hover:border-[var(--color-gold)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
                  <div className="w-8 h-px bg-[var(--color-gold)] mb-6 group-hover:w-16 transition-all duration-300" />
                  <h3 className="font-display text-2xl font-light text-[var(--color-charcoal)] mb-3">{v.title}</h3>
                  <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <TextReveal text={t('CTA.Title')} tag="h2" className="font-display text-4xl md:text-5xl font-light text-[var(--color-charcoal)] mb-6" />
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
