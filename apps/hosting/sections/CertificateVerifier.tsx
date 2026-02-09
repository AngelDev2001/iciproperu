import { FileCheck, Lock, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ContentWidth } from '@/components/ContentWidth';

export function CertificateVerifier() {
  return (
    <section className="py-24 bg-slate-50 border-y border-border">
      <ContentWidth>
        <Card className="max-w-4xl mx-auto overflow-hidden border-none shadow-2xl">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-primary p-8 md:p-12 text-primary-foreground flex flex-col justify-center">
              <Lock className="h-10 w-10 mb-6 opacity-50" />
              <h2 className="text-3xl font-bold mb-4">Verificación Oficial</h2>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Nuestro sistema permite a las unidades de recursos humanos y evaluadores confirmar
                la veracidad de los certificados emitidos por ICIPRO.
              </p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" /> Consulta por DNI
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Validación en Tiempo Real
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 bg-white p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">Validar Documento</h3>
                <p className="text-muted-foreground text-sm">
                  Ingrese el número de identidad o el código único del certificado.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ej. 70654321"
                    className="pl-10 h-12 border-slate-200 focus:ring-primary"
                  />
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-bold transition-all active:scale-[0.98]">
                  Consultar Base de Datos
                </Button>
                <p className="text-[11px] text-center text-muted-foreground">
                  Al consultar, usted acepta nuestros términos de protección de datos y privacidad.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </ContentWidth>
    </section>
  );
}
