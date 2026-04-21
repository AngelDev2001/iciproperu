'use client';

import React from 'react';
import {
  Clock,
  EnvelopeSimple,
  MapPinLine,
  PaperPlaneTilt,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { ContentWidth } from '@/components/ContentWidth';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-12 border-b border-border">
        <ContentWidth>
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">CONTÁCTENOS</h1>
            <p className="text-muted-foreground text-base">
              Estamos a su disposición para resolver cualquier duda sobre nuestros programas
              académicos.
            </p>
          </div>
        </ContentWidth>
      </section>

      <section className="py-16">
        <ContentWidth>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Envíanos un mensaje</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos los campos son obligatorios.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase text-foreground/80 tracking-wider">
                        Nombre Completo
                      </label>
                      <Input
                        placeholder="Ingrese su nombre"
                        className="h-11 rounded-md border-border bg-white focus-visible:ring-primary shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase text-foreground/80 tracking-wider">
                        Correo Electrónico
                      </label>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        className="h-11 rounded-md border-border bg-white focus-visible:ring-primary shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-foreground/80 tracking-wider">
                      Asunto
                    </label>
                    <Input
                      placeholder="Tema de su consulta"
                      className="h-11 rounded-md border-border bg-white focus-visible:ring-primary shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-foreground/80 tracking-wider">
                      Mensaje
                    </label>
                    <Textarea
                      placeholder="Describa su consulta aquí..."
                      className="min-h-[160px] rounded-md border-border bg-white focus-visible:ring-primary shadow-sm resize-none"
                    />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-md transition-all uppercase text-xs tracking-widest">
                    Enviar Formulario
                    <PaperPlaneTilt size={18} weight="bold" className="ml-2" />
                  </Button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="p-8 border-b border-border">
                  <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-wider">
                    Información Directa
                  </h3>

                  <div className="space-y-6">
                    <ContactDetail
                      icon={<WhatsappLogo size={22} className="text-primary" />}
                      label="WhatsApp / Celular"
                      value="+51 947 979 136"
                    />
                    <ContactDetail
                      icon={<EnvelopeSimple size={22} className="text-primary" />}
                      label="Correo Electrónico"
                      value="administracion@iciproperu.com"
                    />
                    <ContactDetail
                      icon={<MapPinLine size={22} className="text-primary" />}
                      label="Ubicación"
                      value="Calle Tres de Mayo L2 Santiago, Cusco"
                    />
                    <ContactDetail
                      icon={<Clock size={22} className="text-secondary" />}
                      label="Horario de Atención"
                      value="Lunes a Domingo: 07:00 AM - 12:00 PM"
                      isGold
                    />
                  </div>
                </div>

                <div className="w-full h-64 bg-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15516.32!2d-71.9!3d-13.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </ContentWidth>
      </section>
    </div>
  );
}

function ContactDetail({ icon, label, value, isGold }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">
          {label}
        </p>
        <p className={`text-sm font-semibold ${isGold ? 'text-secondary' : 'text-foreground'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
