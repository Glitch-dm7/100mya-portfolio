"use client";

import { useRef } from "react";
import Image from "next/image";
import VariableProximity from "../../Animations/VariableProximity";
import IdeaEclipse from "./IdeaEclipse";

export default function HeroHeading() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const proximityProps = {
    containerRef,
    fromFontVariationSettings: "'wght' 550, 'opsz' 40",
    toFontVariationSettings: "'wght' 950, 'opsz' 80",
    radius: 140,
    falloff: "gaussian" as const,
    smoothing: 0.2,
  };

  return (
    <h1
      ref={containerRef}
      className="relative text-center font-robotoFlex text-[42px] leading-[53px] text-[#313131] md:text-[90px] md:leading-[112px]"
    >
      <VariableProximity {...proximityProps} label="Shaping" />{" "}
      <span className="relative inline-block italic">
        <VariableProximity {...proximityProps} label="ideas" />
        <IdeaEclipse />
      </span>{" "}
      <VariableProximity {...proximityProps} label="into" />
      <br className="hidden md:block" />{" "}
      <span className="relative inline-block">
        <VariableProximity {...proximityProps} label="intuitive experiences with" />
        <Image
          src="/images/decoresImg/curve_arrow.png"
          alt=""
          width={160}
          height={80}
          className="pointer-events-none absolute left-[72%] top-full -mt-2 h-12 w-auto rotate-[-80deg] object-contain md:left-[78%] md:mt-2 md:h-28 md:rotate-[-8deg]"
          draggable={false}
        />
      </span>
    </h1>
  );
}
