import Image from "next/image";
import IdeaEclipse from "./IdeaEclipse";

export default function HeroHeading() {
  return (
    <h1
      className="relative text-center font-nanum text-[42px] font-extrabold leading-[53px] text-[#313131] md:text-[clamp(3rem,7.2vw,9rem)] md:font-bold md:leading-[1.14]"
    >
      Shaping{" "}
      <span className="relative inline-block italic">
        ideas
        <IdeaEclipse />
      </span>{" "}
      into
      <br className="hidden md:block" />{" "}
      <span className="relative inline-block">
        intuitive experiences with
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
