'use client';

import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {AnimatePresence, motion} from 'framer-motion';
import {CheckCircle, EnvelopeSimple, PaperPlaneRight, SpinnerGap} from '@phosphor-icons/react';
import {ContentWidth} from "@/components/ContentWidth";

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <ContentWidth>
          <div className="bg-primary p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 rounded-3xl">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 text-white mb-4">
                <EnvelopeSimple size={24} weight="duotone" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Mantente actualizado</h2>
              <p className="text-white/80 text-md max-w-md leading-relaxed">
                Suscríbete a nuestro boletín mensual y recibe primicias sobre nuevos cursos, talleres
                y eventos exclusivos de ICIPRO.
              </p>
            </div>

            <div className="flex-1 w-full max-w-md">
              <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <EnvelopeSimple size={20} />
                  </div>
                  <Input
                      type="email"
                      placeholder="tu@correo.com"
                      required
                      className="h-14 pl-12 bg-background border-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-xl text-base shadow-sm"
                      disabled={status !== 'idle'}
                  />
                </div>

                <Button
                    type="submit"
                    disabled={status !== 'idle'}
                    className="h-14 px-8 bg-white hover:bg-white/90 text-primary font-bold rounded-xl transition-all active:scale-95 shadow-xl disabled:bg-white/70"
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                          Suscribirme
                          <PaperPlaneRight size={18} weight="bold" />
                        </motion.span>
                    )}
                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <SpinnerGap size={20} weight="bold" />
                        </motion.div>
                    )}
                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2"
                        >
                          ¡Listo!
                          <CheckCircle size={20} weight="fill" />
                        </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              <p className="mt-4 text-xs text-center sm:text-left text-white/60">
                Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>
        </ContentWidth>
      </section>
  );
}