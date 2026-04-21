'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  ShareNetwork,
} from '@phosphor-icons/react';
import { ContentWidth } from '@/components/ContentWidth';

const footerLinks = {
  programas: [
    { name: 'Estrategia de Negocios', href: '#' },
    { name: 'Liderazgo Tecnológico', href: '#' },
    { name: 'Innovación Digital', href: '#' },
  ],
  enlacesRapidos: [
    { name: 'Verificador de Certificados', href: '#' },
    { name: 'Términos de Servicio', href: '#' },
    { name: 'Contáctanos', href: '/contacto' },
    { name: 'Sobre Nosotros', href: '/nosotros' },
    { name: 'Libro de Reclamaciones', href: '#' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-iciproperu.png"
                alt="ICIPRO Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>
            <div className="space-y-3 text-xs text-muted-foreground">
              <p className="font-bold text-foreground text-sm uppercase">Información</p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-primary">RUC:</span> 20610542124
              </p>
              <p className="flex items-start gap-2">SANTA ROSA DE LIMA</p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="text-primary shrink-0" />
                Calle Tres de Mayo L2 Santiago
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-primary shrink-0" />
                947979136
              </p>
              <p className="flex items-center gap-2">
                <EnvelopeSimple size={16} className="text-primary shrink-0" />
                administracion@iciproperu.com
              </p>
              <div className="pt-2 border-t border-border/50">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Clock size={16} className="text-primary" />
                  Horario de Atención:
                </p>
                <p className="pl-6">Lunes a Domingo</p>
                <p className="pl-6 font-bold text-primary">07:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-wider">
              Programas
            </h4>
            <ul className="space-y-4">
              {footerLinks.programas.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-wider">
              Enlaces de Interés
            </h4>
            <ul className="space-y-4">
              {footerLinks.enlacesRapidos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-wider">
              Redes Sociales
            </h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
              >
                <FacebookLogo size={20} weight="fill" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
              >
                <InstagramLogo size={20} weight="fill" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-all"
              >
                <LinkedinLogo size={20} weight="fill" />
              </Link>
            </div>
            <div className="pt-4 space-y-3">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Globe size={18} className="text-primary" /> Alcance Global en 45 países.
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <ShareNetwork size={18} className="text-primary" /> Comunidad Digital ICIPRO.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Métodos de Pago
            </h4>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="h-10 bg-white border border-border rounded flex items-center justify-center p-1 shadow-sm transition-hover hover:border-primary/50">
                <Image
                  src="/logo-visa.jpg"
                  alt="VISA"
                  width={30}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="h-10 bg-white border border-border rounded flex items-center justify-center p-1 shadow-sm transition-hover hover:border-primary/50">
                <Image
                  src="/logo-bcp.png"
                  alt="BCP"
                  width={25}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="h-10 bg-white border border-border rounded flex items-center justify-center p-1 shadow-sm transition-hover hover:border-primary/50">
                <Image
                  src="/logo-bn.png"
                  alt="BN"
                  width={25}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                <p className="text-[11px] font-bold text-primary uppercase mb-2 flex items-center gap-1">
                  Banco de Crédito del Perú
                </p>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground flex justify-between">
                    <span className="font-medium">CTA. SOLES:</span>
                    <span className="text-foreground">285-76514325-0-62</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground flex flex-col">
                    <span className="font-medium text-[9px]">CTA. INTERBANCARIA (CCI):</span>
                    <span className="text-foreground">002-28517651432506256</span>
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                <p className="text-[11px] font-bold text-primary uppercase mb-2 flex items-center gap-1">
                  Banco de la Nación
                </p>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground flex justify-between">
                    <span className="font-medium">CTA. SOLES:</span>
                    <span className="text-foreground">04-010-540386</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground flex flex-col">
                    <span className="font-medium text-[9px]">CTA. INTERBANCARIA (CCI):</span>
                    <span className="text-foreground">018-000-004010540386-05</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] leading-relaxed text-muted-foreground bg-secondary/10 p-2 rounded-lg border border-secondary">
                * El voucher de pago debe ser enviado al correo: <br />
                <span className="font-bold text-foreground">administracion@iciproperu.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-[11px] text-muted-foreground">
            &copy; 2023 - {currentYear} Instituto ICIPRO. Todos los derechos reservados.
          </p>
        </div>
      </ContentWidth>
    </footer>
  );
}
