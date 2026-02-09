import { CheckCircle2, Eye, Target } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';

export function AboutPreview() {
  const values = [
    'Excelencia Académica',
    'Integridad Profesional',
    'Innovación Educativa',
    'Compromiso Social',
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <ContentWidth>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/image_322f1f.jpg"
                alt="Oficiales ICIPRO"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 z-20 hidden md:block w-72 rounded-2xl overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="/image_322b78.jpg"
                alt="Clases ICIPRO"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 z-30 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <p className="text-3xl font-extrabold leading-none">10+</p>
              <p className="text-xs uppercase tracking-wider font-medium">Años de Trayectoria</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Comprometidos con el <br />
                <span className="text-primary font-serif italic">Prestigio Policial</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ICIPRO - Santa Rosa de Lima nace con la misión de brindar capacitación técnica
                académica mediante la investigación y el desarrollo científico interdisciplinario.
                Somos una institución dedicada a generar conocimiento pertinente que contribuya a la
                calidad de vida y promoción de la equidad social en el ámbito nacional.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="h-5 w-5" />
                </div>
                <h4 className="font-bold">Nuestra Misión</h4>
                <p className="text-sm text-muted-foreground">
                  Mejorar el sistema educativo ONLINE para fortalecer y adquirir conocimientos para
                  público en general que opta por el desarrollo técnico.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <h4 className="font-bold">Nuestra Visión</h4>
                <p className="text-sm text-muted-foreground">
                  Ser un referente técnico-académico de incidencia nacional e internacional en el
                  campo tecnológico y educación integral.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Nuestros Valores
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {values.map((v) => (
                  <div
                    key={v}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
