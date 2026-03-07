import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { HeaderLayout } from '@/components/HeaderLayout';
import { FooterLayout } from '@/components/FooterLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: 'ICIPRO - Instituto de Capacitación Integral',
    default: 'ICIPRO | Ascenso Policial y Capacitación Profesional',
  },
  description:
    'Especialistas en la formación técnica para el ascenso policial en Perú. Cursos, talleres y diplomados con certificación oficial.',
  keywords: ['ascenso policial', 'PNP', 'capacitación policial', 'ICIPRO', 'certificados'],
};

export const viewport: Viewport = {
  themeColor: '#1a4731',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <HeaderLayout />
        <main className="flex-1">{children}</main>
        <FooterLayout />
      </body>
    </html>
  );
}
