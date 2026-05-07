'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

const NAV_KEYS = [
  { key: 'Home', href: '/' },
  { key: 'Services', href: '/services' },
  { key: 'Gallery', href: '/gallery' },
  { key: 'About', href: '/about' },
  { key: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          'fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl border',
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-[var(--color-stone-warm)] py-3 px-6'
            : 'bg-white/50 backdrop-blur-sm border-transparent py-4 px-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="transition-transform duration-300 group-hover:scale-105 relative w-12 h-12">
              <Image 
                src="/images/dentalist-logo.png"
                alt="Dentalist Clinic Logo"
                fill
                className="object-contain logo-invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-xl tracking-[0.15em] text-[var(--color-charcoal)] leading-none">
                DENTALIST
              </span>
              <span className="font-body font-medium text-[0.55rem] tracking-[0.2em] text-[var(--color-charcoal-muted)] uppercase mt-1 hidden md:block">
                Dental Center
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_KEYS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  href={link.href as any}
                  className={clsx(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-[var(--color-stone-warm)]',
                    isActive ? 'text-[var(--color-charcoal)]' : 'text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)]'
                  )}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {t(link.key as any)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-gold)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="text-xs font-bold uppercase w-10 h-10 rounded-full flex items-center justify-center transition-colors dark:hover:bg-white/10 hover:bg-black/5 text-[var(--foreground)]"
              aria-label="Toggle Language"
            >
              {locale === 'en' ? 'FR' : 'EN'}
            </button>
            <ThemeToggle />
            <Link 
              href="/contact#booking"
              className="px-6 py-2.5 bg-[var(--color-charcoal)] dark:bg-[var(--color-charcoal)] text-[var(--button-text-primary)] text-sm font-semibold rounded-full hover:bg-[var(--color-gold)] dark:hover:bg-[var(--color-gold)] transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(202,138,4,0.23)] hover:-translate-y-0.5 inline-block"
            >
              {t('BookConsultation')}
            </Link>
          </div>

          {/* Mobile Toggle & Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLocale}
              className="text-xs font-bold uppercase w-8 h-8 rounded-full flex items-center justify-center transition-colors dark:hover:bg-white/10 hover:bg-black/5 text-[var(--foreground)]"
            >
              {locale === 'en' ? 'FR' : 'EN'}
            </button>
            <ThemeToggle />
            <button 
              className="p-2 text-[var(--foreground)]"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-6 right-6 p-4 text-[var(--color-charcoal)]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-center">
              {NAV_KEYS.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    href={link.href as any}
                    className={clsx(
                      'font-display text-4xl font-medium transition-colors',
                      pathname === link.href ? 'text-[var(--color-gold)]' : 'text-[var(--color-charcoal)] hover:text-[var(--color-gold)]'
                    )}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {t(link.key as any)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link 
                  href="/contact#booking"
                  className="px-8 py-4 bg-[var(--color-charcoal)] text-[var(--button-text-primary)] text-lg font-semibold rounded-full hover:bg-[var(--color-gold)] transition-colors"
                >
                  {t('BookConsultation')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
