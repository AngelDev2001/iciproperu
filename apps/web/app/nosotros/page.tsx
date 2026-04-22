import {MissionVision} from '@/sections/MissionVision';
import {Trajectory} from '@/sections/Trajectory';
import {_Hero} from "@/sections/_Hero";
import React from "react";

export default function About() {
  return (
    <div>
        <_Hero
            image="/about-hero.png"
            imageAlt=""
            title="Excelencia en Educación Profesional"
            description="Construyendo el estándar de oro para la certificación de la industria y el rigor académico desde 1998." />
      <MissionVision />
      <Trajectory />
    </div>
  );
}
