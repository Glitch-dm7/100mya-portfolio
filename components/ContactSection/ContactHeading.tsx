"use client";

import { useRef } from "react";
import VariableProximity from "../Animations/VariableProximity";

export default function ContactHeading() {
  const containerRef = useRef<HTMLHeadingElement>(null);

  return (
    <h2
      ref={containerRef}
      className="whitespace-nowrap text-center font-montserrat text-[clamp(1.625rem,9vw,2.75rem)] font-semibold leading-[1.22] !text-white md:text-[clamp(3rem,12cqw,13.5rem)] md:leading-[1.12]"
    >
      <VariableProximity
        label="LET'S CONNECT"
        containerRef={containerRef}
        fromFontVariationSettings="'wght' 600"
        toFontVariationSettings="'wght' 900"
        radius={160}
        falloff="gaussian"
        smoothing={0.2}
        stabilizeLayout
        style={{ fontFamily: "inherit" }}
      />
    </h2>
  );
}
