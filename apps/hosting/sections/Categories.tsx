import { ArrowRight, Award, BookOpen, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentWidth } from '@/components/ContentWidth';

export function Categories() {
  const categories = [
    {
      title: 'Cursos de Ascenso',
      description: 'Preparación especializada para los exámenes de grado PNP.',
      icon: <Award className="h-6 w-6 text-primary" />,
      className: 'md:col-span-2 md:row-span-2 bg-primary/5 border-primary/20',
      image: '/image_32367a.jpg', // Foto de la lista de cursos
    },
    {
      title: 'Talleres Prácticos',
      description: 'Capacitación técnica en herramientas de investigación.',
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'Diplomados',
      description: 'Especializaciones de alto nivel con valor académico.',
      icon: <Users className="h-6 w-6 text-primary" />,
      className: 'md:col-span-1 md:row-span-2 bg-secondary',
    },
    {
      title: 'Seminarios',
      description: 'Actualización rápida en normativas actuales.',
      icon: <Clock className="h-6 w-6 text-primary" />,
      className: 'md:col-span-1 md:row-span-1',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <ContentWidth>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Especialízate con los mejores en{' '}
              <span className="text-primary">Capacitación Policial</span>
            </h2>
            <p className="text-muted-foreground">
              Nuestra metodología está diseñada para oficiales activos, optimizando el tiempo y
              enfocándonos en los temas clave del ascenso profesional.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            Ver todo el catálogo <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all hover:shadow-xl flex flex-col justify-between ${cat.className}`}
            >
              <div className="z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">{cat.description}</p>
              </div>

              <div className="z-10 mt-8">
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary font-bold group-hover:gap-3 transition-all"
                >
                  Explorar ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Decoración abstracta de fondo para el estilo Udacity */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
            </div>
          ))}
        </div>
      </ContentWidth>
    </section>
  );
}
