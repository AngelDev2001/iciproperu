'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full py-20 lg:py-20 overflow-hidden bg-background pt-0">
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-[-5%] bottom-0 w-[250px] h-[400px] md:w-[400px] md:h-[600px] lg:block hidden"
        >
          <Image
            src="/estudiante-mujer.png"
            alt="Estudiante ICIPRO"
            fill
            className="object-contain object-bottom"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute right-[-5%] bottom-0 w-[250px] h-[400px] md:w-[400px] md:h-[600px] lg:block hidden"
        >
          <Image
            src="/estudiante-hombre.png"
            alt="Estudiante ICIPRO"
            fill
            className="object-contain object-bottom"
          />
        </motion.div>
      </div>

      <ContentWidth className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold tracking-wide uppercase text-sm mb-6"
          >
            Transforma tu Futuro en ICIPRO
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight"
          >
            Impulsando a la próxima generación de líderes de la industria
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
          >
            A través de certificaciones de clase mundial y formación académica especializada
            diseñada para los desafíos del mercado actual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 h-14 text-base shadow-lg shadow-secondary/20 transition-all hover:scale-105 active:scale-95"
            >
              Explora Nuestros Programas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3 px-6 h-14 rounded-full border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                <GraduationCap size={20} />
              </div>
              <span className="text-sm font-medium text-foreground">
                Más de <span className="text-primary font-bold">15,000</span> Estudiantes Inscritos
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[-1] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
        </div>
      </ContentWidth>
    </section>
  );
}
