'use client';

import React, { useState } from 'react';
import { ContentWidth } from '@/components/ContentWidth';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, Funnel, GraduationCap, MagnifyingGlass, User } from '@phosphor-icons/react';

const coursesData = [
  {
    id: 1,
    category: 'Gestión Pública',
    type: 'DIPLOMADO',
    title: 'Gerencia y Políticas Públicas con mención en Planeamiento Estratégico',
    instructor: 'Mg. Carlos Rodríguez',
    hours: 120,
    price: 350.0,
    img: '/curso-1.jpg',
  },
  {
    id: 2,
    category: 'Derecho Administrativo',
    type: 'DIPLOMADO',
    title: 'Contrataciones del Estado y Gestión de Adquisiciones (Nueva Ley)',
    instructor: 'Dr. Alberto Fernández',
    hours: 140,
    price: 380.0,
    img: '/curso-2.jpg',
  },
  {
    id: 3,
    category: 'Sistemas Administrativos',
    type: 'CURSO ESPECIALIZADO',
    title: 'SIAF, SIGA y SEACE: Herramientas para la Gestión Eficiente',
    instructor: 'Ing. Silvia Torres',
    hours: 90,
    price: 280.0,
    img: '/curso-3.jpg',
  },
  {
    id: 4,
    category: 'Gestión Pública',
    type: 'DIPLOMADO',
    title: 'Presupuesto Público por Resultados y Finanzas Municipales',
    instructor: 'Eco. Manuel Vargas',
    hours: 110,
    price: 340.0,
    img: '/curso-4.jpg',
  },
];

const filterCategories = [
  { id: 'gestion-publica', label: 'Gestión Pública' },
  { id: 'derecho-admin', label: 'Derecho Administrativo' },
  { id: 'sistemas-admin', label: 'Sistemas Administrativos' },
  { id: 'recursos-humanos', label: 'Recursos Humanos' },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section>
      <div className="bg-white min-h-screen pb-20">
        <section className="py-12 border-b border-border bg-gray-50/50 mb-12">
          <ContentWidth>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 uppercase">
                Catálogo de cursos y diplomados
              </h1>
            </div>
          </ContentWidth>
        </section>

        <ContentWidth>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 space-y-6">
              <div className="p-6 border border-border rounded-lg bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Funnel size={22} className="text-primary" />
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">
                    Filtros
                  </h2>
                </div>

                <div className="relative mb-6">
                  <Input
                    type="search"
                    placeholder="Buscar curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 border-border rounded-md focus:ring-primary"
                  />
                  <MagnifyingGlass
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="border-b border-border">
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                      Categoría
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-3">
                      {filterCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox id={category.id} className="border-border rounded" />
                          <label
                            htmlFor={category.id}
                            className="text-sm text-foreground/90 font-medium"
                          >
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b border-border">
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                      Tipo de Programa
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-3">
                      {['DIPLOMADO', 'CURSO ESPECIALIZADO', 'TALLER', 'SEMINARIO'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} className="border-border rounded" />
                          <label htmlFor={type} className="text-sm text-foreground/90 font-medium">
                            {type}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b border-border">
                    <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                      Modalidad
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 space-y-3">
                      {['Virtual Sincrónico', 'Virtual Asincrónico'].map((mod) => (
                        <div key={mod} className="flex items-center space-x-2">
                          <Checkbox id={mod} className="border-border rounded" />
                          <label htmlFor={mod} className="text-sm text-foreground/90 font-medium">
                            {mod}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </aside>

            <main className="lg:col-span-9 space-y-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando <span className="font-bold text-foreground">4</span> de{' '}
                  {coursesData.length} resultados
                </p>
                <div className="text-xs text-muted-foreground">
                  Filtros activos: Gestión Pública x
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              {/* Paginación Simple */}
              <div className="flex justify-center pt-8">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="rounded-md">
                    Anterior
                  </Button>
                  <Button variant="default" size="sm" className="rounded-md bg-primary">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-md">
                    Siguiente
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </ContentWidth>
      </div>
    </section>
  );
}

function CourseCard({ course }: any) {
  return (
    <Card className="p-0 border border-border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
      <div className="relative w-full h-44 bg-gray-200">
        <Badge
          variant="default"
          className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase rounded px-2.5 py-1 z-10"
        >
          {course.type}
        </Badge>
        <div className="absolute inset-0 bg-gray-300" />
      </div>

      <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none mb-1.5">
            {course.category}
          </p>
          <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-3">
            {course.title}
          </h3>
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{course.hours} Horas Lectivas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={16} />
              <span>{course.instructor.split(' ')[1]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-black text-foreground">S/. {course.price.toFixed(2)}</div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md px-4 text-xs uppercase tracking-wider"
            >
              Ver Detalles
              <GraduationCap size={16} weight="bold" className="ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
