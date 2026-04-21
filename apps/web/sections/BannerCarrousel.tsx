'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentWidth } from '@/components/ContentWidth';

const BANNERS = [
  { id: 1, src: '/banner-1.png', alt: 'Diplomado en Gestión Pública' },
  { id: 2, src: '/banner-1.png', alt: 'Especialización 2' },
  { id: 3, src: '/banner-1.png', alt: 'Curso 3' },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const handleNext = () => {
    setIndex((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      animate(x, -index * width, {
        type: 'spring',
        stiffness: 260,
        damping: 28,
      });
    }
  }, [index, x]);

  const onDragEnd = (e: any, { offset, velocity }: any) => {
    const width = containerRef.current?.offsetWidth || 0;
    const swipeConfidenceThreshold = 10000;
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    } else {
      const dragDistance = x.get();
      const newIndex = Math.round(Math.abs(dragDistance) / width);
      setIndex(Math.max(0, Math.min(newIndex, BANNERS.length - 1)));
    }
  };

  return (
    <section className="w-full bg-background border-y border-border py-4">
      <ContentWidth>
        <div className="group relative overflow-hidden rounded-xl" ref={containerRef}>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50"
          >
            <ChevronRight size={18} />
          </button>

          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={containerRef}
            onDragEnd={onDragEnd}
          >
            {BANNERS.map((banner) => (
              <div
                key={banner.id}
                className="relative w-full aspect-3/1 md:aspect-4/1 lg:aspect-5/1 shrink-0 select-none px-1"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    className="pointer-events-none"
                    priority
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </ContentWidth>
    </section>
  );
}
