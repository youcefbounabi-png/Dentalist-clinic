'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import TextReveal from '@/components/ui/TextReveal';
import { useTranslations } from 'next-intl';

function ContactForm() {
  const t = useTranslations('ContactPage.Form');
  const tServices = useTranslations('ServicesPage.Items');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const servicesList = [
    tServices('veneers.title'),
    tServices('implants.title'),
    tServices('whitening.title'),
    tServices('invisalign.title'),
    tServices('makeover.title'),
    tServices('general.title'),
    t('Placeholders.other', { defaultMessage: 'Other / General Enquiry' }),
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--color-gold)] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="font-display text-3xl font-light text-[var(--color-charcoal)] mb-3">{t('SuccessTitle')}</h3>
          <p className="text-[var(--color-charcoal-muted)]">{t('SuccessDesc')}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { id: 'name', label: t('Labels.name'), type: 'text', placeholder: t('Placeholders.name') },
              { id: 'email', label: t('Labels.email'), type: 'email', placeholder: t('Placeholders.email') },
              { id: 'phone', label: t('Labels.phone'), type: 'tel', placeholder: t('Placeholders.phone') },
            ].map((field) => (
              <div key={field.id} className={field.id === 'phone' ? 'md:col-span-2' : ''}>
                <label htmlFor={field.id} className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-charcoal)] mb-2">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-[var(--color-stone-warm)] border border-transparent focus:border-[var(--color-gold)] focus:outline-none transition-colors text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal-muted)]/50 text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-charcoal)] mb-2">
              {t('Labels.interest')}
            </label>
            <select
              id="service"
              required
              className="w-full px-5 py-4 rounded-xl bg-[var(--color-stone-warm)] border border-transparent focus:border-[var(--color-gold)] focus:outline-none transition-colors text-[var(--color-charcoal)] text-sm appearance-none cursor-pointer"
            >
              <option value="">{t('Placeholders.interest')}</option>
              {servicesList.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-charcoal)] mb-2">
              {t('Labels.message')}
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder={t('Placeholders.message')}
              className="w-full px-5 py-4 rounded-xl bg-[var(--color-stone-warm)] border border-transparent focus:border-[var(--color-gold)] focus:outline-none transition-colors text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal-muted)]/50 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[var(--color-charcoal)] text-[var(--button-text-primary)] font-semibold rounded-full hover:bg-[var(--color-gold)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(202,138,4,0.3)] disabled:opacity-60 disabled:cursor-not-allowed text-sm tracking-wide"
          >
            {loading ? t('Loading') : t('Submit')}
          </button>
          <p className="text-xs text-center text-[var(--color-charcoal-muted)]">{t('Disclaimer')}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-12 pb-16 px-6 relative overflow-hidden">
        <span aria-hidden className="absolute right-0 top-0 font-display text-[clamp(200px,25vw,350px)] font-bold text-black/[0.03] select-none leading-none pointer-events-none">CTT</span>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[var(--color-gold)]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-charcoal-muted)]">{t('Hero.Subtitle')}</span>
            </div>
          </FadeIn>
          <TextReveal text={t('Hero.Title')} tag="h1" className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[1.0] text-[var(--color-charcoal)] max-w-3xl mb-8" />
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section id="booking" className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          {/* Left: Info */}
          <FadeIn direction="right" className="space-y-6 sticky top-32">
            <div className="rounded-3xl bg-[var(--color-stone-warm)] p-8 md:p-10 space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-4">{t('Info.Location')}</p>
                <p className="font-display text-xl font-light text-[var(--color-charcoal)]">Boulevard Mohamed Boudiaf N° 26</p>
                <p className="text-[var(--color-charcoal-muted)]">Blida, Algeria</p>
              </div>
              <div className="h-px bg-black/5" />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-2">{t('Info.Phone')}</p>
                  <a href="tel:0778564665" className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors text-sm">0778 564 665 / 0562 927 954</a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-2">{t('Info.Email')}</p>
                  <a href="mailto:contact@dentalistclinic.com" className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors text-sm break-all">contact@dentalistclinic.com</a>
                </div>
              </div>
              <div className="h-px bg-black/5" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-4">{t('Info.Hours')}</p>
                <div className="space-y-2 text-sm">
                  {[
                    { d: t('Info.Days.mon_fri'), h: t('Info.Times.mon_fri') },
                    { d: t('Info.Days.sat'), h: t('Info.Times.sat') },
                    { d: t('Info.Days.sun'), h: t('Info.Times.sun') },
                  ].map((row) => (
                    <div key={row.d} className="flex justify-between text-[var(--color-charcoal-muted)]">
                      <span>{row.d}</span>
                      <span className="font-medium text-[var(--color-charcoal)]">{row.h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video embed */}
            <div className="rounded-3xl overflow-hidden aspect-[4/5] border border-black/5 relative group bg-black">
              <video
                src="/media/promo-video-2.mp4"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Boulevard Mohamed Boudiaf N° 26
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-sm">
              <h2 className="font-display text-3xl font-light text-[var(--color-charcoal)] mb-2">{t('Form.Title')}</h2>
              <p className="text-sm text-[var(--color-charcoal-muted)] mb-8">{t('Form.Description')}</p>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
