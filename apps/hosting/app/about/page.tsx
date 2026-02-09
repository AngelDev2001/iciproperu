import { ContentWidth } from '@/components/ContentWidth';
import { Eye, ShieldCheck, Target } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const valores = [
    { nombre: 'Responsabilidad', nivel: '100%' },
    { nombre: 'Compromiso', nivel: '100%' },
    { nombre: 'Trabajo en equipo', nivel: '100%' },
    { nombre: 'Solidaridad', nivel: '100%' },
    { nombre: 'Respeto', nivel: '100%' },
    { nombre: 'Innovación', nivel: '100%' },
  ];

  return (
    <main className="py-16">
      <ContentWidth>
        {/* Sección: Bienvenida e Historia */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Bienvenidos a <span className="text-primary italic font-serif">ICIPRO-PERÚ</span>
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                El Instituto de Capacitación Integral Profesional – Santa Rosa de Lima (ICIPRO), es
                una empresa privada creada en el Perú para brindar capacitación técnica académica.
              </p>
              <p>
                Nuestra formación se basa en la investigación y desarrollo científico
                interdisciplinario y transdisciplinario en el campo de las Ciencias de la Educación
                ONLINE.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/image_322f1f.jpg" alt="Personal de ICIPRO" fill className="object-cover" />
          </div>
        </div>

        {/* Sección: Misión y Visión (Cards de Udacity Style) */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-primary/5 p-10 rounded-3xl border border-primary/10 relative overflow-hidden group">
            <Target className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Realizar procesos de investigación en el campo tecnológico y la educación social;
              vinculando la docencia y la acción social para generar conocimiento pertinente que
              contribuya a la equidad social.
            </p>
          </div>
          <div className="bg-secondary/30 p-10 rounded-3xl border border-border relative overflow-hidden group">
            <Eye className="h-12 w-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ser un referente técnico-académico de incidencia nacional e internacional en el campo
              tecnológico y educación integral, mediante el intercambio de conocimientos con redes
              académicas ONLINE.
            </p>
          </div>
        </div>

        {/* Sección: Valores (Refactorización de las barras horizontales) */}
        <div className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <ShieldCheck className="h-64 w-64 text-white" />
          </div>

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gold">Pilares Institucionales</h2>
              <p className="text-slate-400">
                Mantenemos un estándar de excelencia del 100% en cada uno de nuestros valores éticos
                y profesionales.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {valores.map((item) => (
                <div key={item.nombre} className="space-y-2">
                  <div className="text-3xl font-bold text-white">{item.nivel}</div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {item.nombre}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentWidth>
    </main>
  );
}
