'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartHandshake, MessagesSquare, Presentation, Trophy } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';

export function Info() {
  return (
    <section className="py-16 bg-background">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-muted/30 transition-all hover:shadow-md">
            <CardHeader>
              <HeartHandshake className="text-primary mb-2" />
              <CardTitle className="text-xl font-bold">Confianza</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Reputación global por excelencia e integridad profesional en la educación.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted/30 transition-all hover:shadow-md md:col-span-1">
            <CardHeader>
              <Presentation className="text-primary mb-2" />
              <CardTitle className="text-xl font-bold">Facultad Experta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Aprende de pioneros de la industria con décadas de experiencia práctica y rigor
                académico.
              </p>
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-10 h-10">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Instructor" />
                    <AvatarFallback>FE</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted/30 transition-all hover:shadow-md">
            <CardHeader>
              <Trophy className="text-primary mb-2" />
              <CardTitle className="text-xl font-bold">Programas de Calidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Certificaciones curadas que cumplen con los más altos estándares internacionales.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted/30 transition-all hover:shadow-md md:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center">
              <CardHeader className="shrink-0">
                <MessagesSquare className="text-primary mb-2" />
              </CardHeader>
              <CardContent className="md:pt-6">
                <CardTitle className="text-xl font-bold mb-2">Soporte Dedicado</CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  Asistencia estudiantil 24/7 y asesoramiento profesional para guiar tu camino al
                  éxito.
                </p>
              </CardContent>

              <div className="hidden md:block ml-auto pr-8 opacity-10">
                <MessagesSquare className="text-primary" />
              </div>
            </div>
          </Card>
        </div>
      </ContentWidth>
    </section>
  );
}
