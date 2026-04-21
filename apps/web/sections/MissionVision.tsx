'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Binoculars, Compass } from '@phosphor-icons/react';
import { ContentWidth } from '@/components/ContentWidth';
import { motion } from 'framer-motion';

export function MissionVision() {
  return (
    <section className="py-20 bg-background">
      <ContentWidth>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden h-full">
              <CardContent className="p-8 md:p-12">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <Compass size={32} weight="duotone" className="text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Nuestra Misión</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Empoderar a profesionales de todo el mundo con conocimientos de vanguardia,
                  fomentando un entorno de innovación continua e integridad inquebrantable en la era
                  digital.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden h-full">
              <CardContent className="p-8 md:p-12">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8">
                  <Binoculars size={32} weight="duotone" className="text-secondary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                  Nuestra Visión
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ser el referente mundial en certificación profesional, reconocido por los líderes
                  de la industria por producir a los especialistas más competentes y éticos en el
                  campo.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ContentWidth>
    </section>
  );
}
