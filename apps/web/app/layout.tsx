import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ICIPRO PERÚ | Instituto de Capacitación Integral Profesional',
    template: '%s | ICIPRO PERÚ',
  },
  description:
    'Especialistas en formación continua para el sector público y privado. Diplomados, cursos y especializaciones con certificación de alto impacto en Santa Rosa de Lima.',
  keywords: [
    'ICIPRO',
    'Capacitación profesional',
    'Diplomados Perú',
    'Cursos técnicos',
    'Santa Rosa de Lima',
    'Educación continua',
  ],
  authors: [{ name: 'ICIPRO PERÚ' }],
  creator: 'ICIPRO PERÚ',
  publisher: 'ICIPRO PERÚ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ICIPRO PERÚ | Educación Profesional de Alto Impacto',
    description: 'Transforma tu carrera con nuestras especializaciones y diplomados certificados.',
    url: 'https://iciproperu-web.vercel.app/',
    siteName: 'ICIPRO PERÚ',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ICIPRO PERÚ - Instituto de Capacitación',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICIPRO PERÚ',
    description: 'Capacitación profesional certificada en Santa Rosa de Lima.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className={`${geistSans.className} min-h-full flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
