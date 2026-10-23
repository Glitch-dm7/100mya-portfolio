"use client";

import { useRef } from "react";
import VariableProximity from "../../Animations/VariableProximity";

const bioParts = [
  { text: "I'm ", emphasized: false },
  { text: "SAUMYA GAUTAM", emphasized: true, keepTogether: true },
  { text: ", a UX/UI designer driven by ", emphasized: false },
  { text: "CURIOSITY", emphasized: true },
  { text: " and ", emphasized: false },
  { text: "CREATIVITY", emphasized: true },
  { text: ". I specialize in crafting intuitive, ", emphasized: false },
  { text: "USER-CENTERED DESIGNS", emphasized: true },
  { text: " that solve real-world problems.", emphasized: false },
];

export default function AboutParagraph() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  return (
    <p
      ref={containerRef}
      className="relative mx-auto max-w-[358px] text-center font-montserrat text-[20px] font-medium leading-[28px] text-[#3C3C3C] md:mx-0 md:max-w-none md:text-left md:text-[40px] md:leading-[60px] md:tracking-[0.02em]"
    >
      {bioParts.map(({ text, emphasized, keepTogether }) => (
        <VariableProximity
          key={text}
          label={text}
          containerRef={containerRef}
          fromFontVariationSettings={`'wght' ${emphasized ? 700 : 500}`}
          toFontVariationSettings={`'wght' ${emphasized ? 900 : 850}`}
          radius={140}
          falloff="gaussian"
          smoothing={0.2}
          stabilizeLayout
          className={keepTogether ? "whitespace-nowrap" : undefined}
          style={{ fontFamily: "inherit" }}
        />
      ))}
    </p>
  );
}
