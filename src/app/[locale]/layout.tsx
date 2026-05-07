import type { Metadata } from 'next';
import { Cormorant, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ThemeProvider from '@/components/providers/ThemeProvider';
import EtherealBackground from '@/components/ui/EtherealBackground';

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Title'),
    description: t('Description'),
    keywords: ['dental clinic', 'cosmetic dentistry', 'veneers', 'smile makeover', 'Dentalist Clinic', 'premium dentistry', 'clinique dentaire', 'facettes', 'implants'],
    authors: [{ name: 'Dr. Aouetta Med Saleh' }],
    metadataBase: new URL('https://dentalist-clinic.vercel.app'),
    openGraph: {
      title: t('Title'),
      description: t('Description'),
      url: 'https://dentalist-clinic.vercel.app',
      siteName: 'Dentalist Clinic',
      images: [
        {
          url: 'https://dentalist-clinic.vercel.app/images/dr-aouetta-profile.jpg',
          width: 1200,
          height: 630,
          alt: 'Dentalist Clinic Brand Image',
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('Title'),
      description: t('Description'),
      images: ['https://dentalist-clinic.vercel.app/images/dr-aouetta-profile.jpg'],
    },
    icons: {
      icon: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col relative transition-colors duration-500 bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange suppressHydrationWarning>
          <NextIntlClientProvider messages={messages}>
            <SmoothScroll>
              <EtherealBackground />
              <Navbar />
              <main className="flex-grow pt-24 relative w-full min-h-screen">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
