import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aula Virtual | Icipro Perú',
  description: 'Aula Virtual | Icipro Perú',
  icons: {
    icon: [
      { url: '/logo-iciproperu.png' },
      new URL('/logo-iciproperu.png', 'https://iciproperu.com'),
      { url: '/logo-iciproperu.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cn("dark", geistMono.variable, "font-sans", geistSans.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
