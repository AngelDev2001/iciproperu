'use client';

import React from 'react';
import { ContentWidth } from '@/components/ContentWidth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  DownloadSimple,
  Files,
  WhatsappLogo,
} from '@phosphor-icons/react';

export default function CourseDetails() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-primary py-16 md:py-24 text-white">
        <ContentWidth>
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none px-4 py-1">
              DIPLOMADO DE ESPECIALIZACIÓN
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Gerencia y Políticas Públicas con mención en Planeamiento Estratégico
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Fortalece tus capacidades en la gestión del Estado con herramientas modernas de
              planeamiento y ejecución presupuestal.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8">
                Inscribirme Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold"
              >
                Descargar Broshure
                <DownloadSimple className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </ContentWidth>
      </section>

      <section className="py-16">
        <ContentWidth>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Sobre el Programa</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Este programa ha sido diseñado para proporcionar a los participantes una visión
                  integral de los procesos de modernización de la gestión pública en el Perú, con
                  especial énfasis en los sistemas administrativos y el planeamiento estratégico
                  institucional.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Plan de Estudios</h2>
                <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                  <AccordionItem value="mod-1" className="px-6 border-b">
                    <AccordionTrigger className="hover:no-underline font-bold py-5">
                      Módulo I: Introducción a la Gestión Pública
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Estado, Gobierno y Administración Pública.</li>
                        <li>Políticas Públicas y Modernización del Estado.</li>
                        <li>Sistemas Administrativos y Funcionales.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="mod-2" className="px-6 border-b">
                    <AccordionTrigger className="hover:no-underline font-bold py-5">
                      Módulo II: Planeamiento Estratégico (CEPLAN)
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      Contenido detallado sobre la metodología de planeamiento estratégico...
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BenefitItem text="Certificación válida para concursos públicos." />
                <BenefitItem text="Plataforma virtual disponible 24/7." />
                <BenefitItem text="Docentes con amplia experiencia en el Estado." />
                <BenefitItem text="Materiales de estudio descargables." />
              </div>
            </div>

            <div className="lg:col-span-4">
              <Card className="sticky top-28 border-border shadow-lg rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-6 border-b border-border">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">
                    Inversión Total
                  </p>
                  <p className="text-3xl font-black text-foreground">S/. 350.00</p>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <InfoRow
                      icon={<CalendarBlank size={20} />}
                      label="Inicio"
                      value="15 de Mayo, 2026"
                    />
                    <InfoRow
                      icon={<Clock size={20} />}
                      label="Duración"
                      value="120 Horas Lectivas"
                    />
                    <InfoRow
                      icon={<Files size={20} />}
                      label="Modalidad"
                      value="Virtual Sincrónico"
                    />
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90 h-12 font-bold uppercase text-xs tracking-widest">
                      Registrarme Ahora
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50 h-12 font-bold"
                    >
                      <WhatsappLogo size={22} weight="fill" className="mr-2" />
                      Consultar por WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ContentWidth>
      </section>
    </div>
  );
}

function InfoRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
      <CheckCircle size={24} weight="fill" className="text-primary shrink-0" />
      <span className="text-sm font-medium text-foreground/80">{text}</span>
    </div>
  );
}
