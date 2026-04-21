'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContentWidth } from '@/components/ContentWidth';

const trajectoryData = [
  {
    year: '1998',
    title: 'Fundación',
    description:
      'El Instituto ICIPRO se establece como un centro de formación local para tecnologías emergentes.',
    align: 'left',
  },
  {
    year: '2005',
    title: 'Acreditación Global',
    description:
      'Logro de la certificación ISO 9001 y asociación con las principales juntas de certificación internacionales.',
    align: 'right',
  },
  {
    year: '2014',
    title: 'Transformación Digital',
    description:
      'Lanzamiento de nuestra plataforma propia de e-learning, llevando la educación experta a más de 50 países.',
    align: 'left',
  },
  {
    year: 'Presente',
    title: 'Liderando el Futuro',
    description:
      'Sirviendo ahora a más de 500,000 exalumnos en todo el mundo con planes de estudio integrados con IA de última generación.',
    align: 'right',
  },
];

export function Trajectory() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <ContentWidth>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestra Trayectoria
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border md:block hidden" />

          <div className="space-y-12 md:space-y-24">
            {trajectoryData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center w-full ${
                  item.align === 'left' ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full md:w-1/2">
                  <div
                    className={`p-6 ${item.align === 'left' ? 'md:text-right' : 'md:text-left'} text-center`}
                  >
                    <span className="text-primary font-bold text-xl block mb-1">{item.year}</span>
                    <h3 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto md:mx-0 inline-block">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center z-10 my-4 md:my-0">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-secondary shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                </div>

                <div className="flex-1 md:block hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </ContentWidth>
    </section>
  );
}
