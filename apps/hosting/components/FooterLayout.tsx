import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Shield } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';

export function FooterLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary/30 border-t border-border mt-20 py-12">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-iciproperu.png"
                alt="ICIPRO Logo"
                width={40}
                height={40}
                className="rounded-full grayscale brightness-125"
              />
              <span className="text-lg font-bold text-primary">ICIPRO</span>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="font-bold text-foreground">
                INSTITUTO DE CAPACITACIÓN INTEGRAL PROFESIONAL SANTA ROSA DE LIMA
              </p>
              <p>RUC: 20610542124</p>
              <p className="mt-2">
                Especialistas en la formación técnica para el ascenso policial.
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Institución</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary">
                  Catálogo de Cursos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Verificador de Certificados
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Calle Tres de Mayo L2, Santiago - Cusco</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+51 947 979 136</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="break-all">administracion@iciproperu.com</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Seguridad y Pagos */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Pagos Seguros</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Aceptamos transferencias y depósitos a nivel nacional.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-8 w-12 border p-2 rounded p-1">
                <Image
                  src="/logo-bn.png"
                  alt="Banco de la Nación"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-8 w-12 border p-2 rounded p-1">
                <Image src="/logo-bcp.png" alt="BCP" fill className="object-contain" />
              </div>
            </div>
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <span className="text-[10px] font-medium leading-tight uppercase tracking-tighter">
                Sistema de Verificación Protegido
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2023 - {currentYear} ICIPRO Perú. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">
              Términos
            </Link>
            <Link href="#" className="hover:underline">
              Privacidad
            </Link>
          </div>
        </div>
      </ContentWidth>
    </footer>
  );
}
