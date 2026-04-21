'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ContentWidth } from '@/components/ContentWidth';

export function AboutHero() {
  return (
    <section className="relative w-full min-h-125 md:min-h-150 flex items-center overflow-hidden bg-[#0a1a1a]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/fondo-nosotros.jpg"
          alt="ICIPRO Background"
          fill
          className="object-cover opacity-40 mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a1a1a] via-[#0a1a1a]/80 to-transparent" />
      </div>

      <ContentWidth className="relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Excelencia en Educación Profesional
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl"
          >
            Construyendo el estándar de oro para la certificación de la industria y el rigor
            académico desde 1998.
          </motion.p>
        </div>
      </ContentWidth>
    </section>
  );
}
