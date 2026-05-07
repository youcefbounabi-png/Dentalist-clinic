import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const tServices = useTranslations('ServicesPage.Items');

  return (
    <footer className="bg-[var(--color-stone-warm)] pt-24 pb-12 mt-auto border-t border-black/5 relative overflow-hidden">
      {/* Decorative Branded Watermark */}
      <div className="absolute -bottom-5 -right-10 opacity-[0.03] pointer-events-none select-none dark:opacity-[0.07]">
        <Image 
          src="/images/orbital-tooth.png"
          alt=""
          width={450}
          height={450}
          className="logo-invert"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <div className="transition-transform duration-300 group-hover:scale-105 relative w-8 h-8">
                <Image 
                  src="/images/dentalist-logo.png"
                  alt="Dentalist Clinic Logo"
                  fill
                  sizes="32px"
                  className="object-contain logo-invert"
                />
              </div>
              <span className="font-display font-semibold text-xl tracking-[0.15em] text-[var(--color-charcoal)] leading-none">
                DENTALIST
              </span>
            </Link>
            <p className="text-sm text-[var(--color-charcoal-muted)] leading-relaxed max-w-sm">
              {t('Description')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-charcoal)] mb-6">{t('QuickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { label: tNav('Home'), href: '/' },
                { label: tNav('Services'), href: '/services' },
                { label: tNav('Gallery'), href: '/gallery' },
                { label: tNav('About'), href: '/about' },
                { label: tNav('Contact'), href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href as any}
                    className="text-sm text-[var(--color-charcoal-muted)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-charcoal)] mb-6">{t('Services')}</h4>
            <ul className="space-y-3">
              {[
                { name: tServices('implants.title'), id: 'implants' },
                { name: tServices('veneers.title'), id: 'veneers' },
                { name: tServices('whitening.title'), id: 'whitening' },
                { name: tServices('invisalign.title'), id: 'invisalign' },
                { name: tServices('makeover.title'), id: 'makeover' },
              ].map((item) => (
                <li key={item.id}>
                  <Link 
                    href={`/services#${item.id}` as any}
                    className="text-sm text-[var(--color-charcoal-muted)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-charcoal)] mb-6">{t('Contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--color-charcoal-muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 text-[var(--color-gold)] shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Boulevard mohamed boudiaf,<br/>Blida</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-charcoal-muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 text-[var(--color-gold)] shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>0778 564 665 / 0562 927 954</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs text-[var(--color-charcoal-muted)]">
            &copy; {new Date().getFullYear()} {t('Rights')}
          </p>
          
          <div className="flex gap-4">
            {['Instagram', 'Facebook', 'Twitter'].map((social) => (
              <a key={social} href={social === 'Instagram' ? "https://www.instagram.com/dr_aouetta_med/" : "#"} aria-label={social} target={social === 'Instagram' ? "_blank" : undefined} rel={social === 'Instagram' ? "noopener noreferrer" : undefined} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[var(--color-charcoal-muted)] hover:bg-[var(--color-gold)] hover:text-white hover:border-transparent transition-all duration-300">
                {social === 'Instagram' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
                {social === 'Facebook' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>}
                {social === 'Twitter' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
