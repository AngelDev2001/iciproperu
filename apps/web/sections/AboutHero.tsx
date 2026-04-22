'use client';

import React from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {ContentWidth} from '@/components/ContentWidth';

export function AboutHero() {
    return (
        <section className="relative w-full min-h-75 md:min-h-100 flex items-center overflow-hidden bg-[#0a1a1a]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/about-hero.png"
                    alt="ICIPRO Background"
                    fill
                    className="mix-blend-screen"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0a1a1a] via-[#0a1a1a]/80 to-transparent" />
            </div>

            <ContentWidth className="relative z-10 w-full text-left">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-6"
                    >
                        Excelencia en <br className="hidden md:block" /> Educación Profesional
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-200 leading-relaxed max-w-xl"
                    >
                        Construyendo el estándar de oro para la certificación de la industria y el rigor
                        académico desde 1998.
                    </motion.p>
                </div>
            </ContentWidth>
        </section>
    );
}