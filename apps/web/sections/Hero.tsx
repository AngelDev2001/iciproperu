import { Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContentWidth } from '@/components/ContentWidth';

export function Hero() {
  return (
    <section className="overflow-hidden bg-background">
      <ContentWidth>
        <div className="relative w-full py-10">
          <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-secondary/20 skew-x-12 translate-x-20 hidden lg:block" />

          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado Izquierdo: Texto y Buscador */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Institución Líder en Ascenso Policial
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                  Tu próximo grado <br />
                  <span className="text-primary italic">empieza aquí.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[540px] leading-relaxed">
                  Capacitación técnica de alto nivel diseñada exclusivamente para oficiales que
                  buscan excelencia en su proceso de ascenso.
                </p>
              </div>

              {/* CAJA DEL VERIFICADOR (Udacity Style) */}
              <div className="relative max-w-md p-2 bg-white rounded-xl shadow-2xl shadow-primary/10 border border-border">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="DNI o Código de Certificado"
                      className="pl-10 border-none shadow-none focus-visible:ring-0 text-base"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 px-6 font-semibold">
                    Verificar
                  </Button>
                </div>
                <p className="absolute -bottom-7 left-2 text-[11px] text-muted-foreground">
                  * Consulta instantánea en nuestra base de datos nacional.
                </p>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Alumnos" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  <span className="text-primary font-bold">+500 oficiales</span> ya certificados
                  este año.
                </p>
              </div>
            </div>

            {/* Lado Derecho: Imagen Institucional */}
            <div className="relative lg:block hidden">
              <div className="relative z-10 rounded-2xl overflow-hidden border-8 border-white shadow-2xl rotate-2">
                {/* Aquí puedes usar la foto de los dos oficiales que me pasaste */}
                <img
                  src="/hero-photo.png"
                  alt="Capacitación ICIPRO"
                  className="object-cover w-full h-[500px]"
                />
              </div>
              {/* Badge flotante de éxito */}
              <div className="absolute -bottom-6 -left-10 z-20 bg-white p-6 rounded-xl shadow-xl border border-border animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                    🏆
                  </div>
                  <div>
                    <p className="text-sm font-bold">98% de Aprobación</p>
                    <p className="text-xs text-muted-foreground">En exámenes de ascenso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
