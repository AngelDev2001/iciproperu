import { ContentWidth } from '@/components/ContentWidth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import Image from 'next/image';

const cursos = [
  {
    id: 1,
    title: 'Conducción de Vehículos Policiales',
    category: 'Cursos de Ascenso',
    date: 'Inicia 15 Marzo',
    image: '/image_32367a.jpg', // Usamos la misma imagen de referencia o una específica
  },
  {
    id: 2,
    title: 'Atención al Cliente y Calidad de Servicio',
    category: 'Talleres',
    date: 'Inicia 20 Marzo',
    image: '/image_32367a.jpg',
  },
  // ... más cursos
];

export default function Courses() {
  return (
    <div className="py-16">
      <ContentWidth>
        {/* Encabezado de Página */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Catálogo de Capacitación</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Programas diseñados para el fortalecimiento de competencias técnicas y profesionales del
            personal policial y público en general.
          </p>
        </div>

        {/* Filtros y Buscador */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar curso o especialidad..." className="pl-10" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {['Todos', 'Ascenso', 'Talleres', 'Diplomados'].map((tab) => (
              <Button key={tab} variant={tab === 'Todos' ? 'default' : 'outline'} size="sm">
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cursos.map((curso) => (
            <Card
              key={curso.id}
              className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="p-0 relative h-48">
                <Image
                  src={curso.image}
                  alt={curso.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md">
                  {curso.category}
                </Badge>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold leading-tight line-clamp-2 h-10 group-hover:text-primary transition-colors">
                  {curso.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {curso.date}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button className="w-full gap-2 group/btn">
                  Más información
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ContentWidth>
    </div>
  );
}
