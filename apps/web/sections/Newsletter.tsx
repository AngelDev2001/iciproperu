'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, Mail, Send } from 'lucide-react';

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="py-20 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Texto Informativo */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
              <Mail size={24} />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Mantente actualizado</h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Suscríbete a nuestro boletín mensual y recibe primicias sobre nuevos cursos, talleres
              y eventos exclusivos de ICIPRO.
            </p>
          </div>

          {/* Formulario de Suscripción */}
          <div className="flex-1 w-full max-w-md">
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail size={20} />
                </div>
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  required
                  className="h-14 pl-12 bg-background border-border focus-visible:ring-primary rounded-xl text-base shadow-sm"
                  disabled={status !== 'idle'}
                />
              </div>

              <Button
                type="submit"
                disabled={status !== 'idle'}
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20"
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
                      <Send size={18} />
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.div
                      key="loading"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send size={20} />
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
                      <CircleCheck size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </form>

            <p className="mt-4 text-xs text-center sm:text-left text-muted-foreground">
              Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
