'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BadgeCheck, Loader, Search, ShieldCheck } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';

export function CertificateVerification() {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => setIsVerifying(false), 2000);
  };

  return (
    <section className="py-20 bg-muted/20">
      <ContentWidth>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <BadgeCheck size={64} className="text-primary" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full scale-125"
              />
            </div>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Valida tu Certificado ICIPRO
          </h2>

          <p className="text-muted-foreground mb-10 text-balance">
            Los empleadores pueden verificar instantáneamente las credenciales de los estudiantes
            utilizando nuestro libro mayor seguro respaldado por tecnología de certificación
            digital.
          </p>

          {/* Formulario de Búsqueda */}
          <form onSubmit={handleVerify} className="relative group max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search size={20} />
              </div>

              <Input
                type="text"
                placeholder="Ingresa el número de ID único del certificado..."
                className="h-16 pl-12 pr-32 bg-background border-border focus-visible:ring-primary shadow-sm text-base rounded-2xl transition-all"
                required
              />

              <div className="absolute right-2">
                <Button
                  type="submit"
                  disabled={isVerifying}
                  className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all active:scale-95 disabled:opacity-70"
                >
                  {isVerifying ? <Loader className="animate-spin" size={20} /> : 'Verificar'}
                </Button>
              </div>
            </div>
          </form>

          <p className="mt-6 text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck size={16} />
            ID de ejemplo: ICIPRO-2026-XXXX
          </p>
        </div>
      </ContentWidth>
    </section>
  );
}
