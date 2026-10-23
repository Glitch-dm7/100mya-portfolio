import SkillsAutoScroll from "./components/SkillsAutoScroll";
import TypeWriter from "../TypeWriter/TypeWriter";
import ScrollReveal from "../Animations/ScrollReveal";
import HeroHeading from "./components/HeroHeading";
import Image from "next/image";

const typoData: string[] = [
  "ux and ui design",
  "curiosity and innovation",
  "strategy and process",
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[95svh] flex-col overflow-x-clip bg-background bg-[url('/images/dots-bg.png'),url('/images/bg-gradient.png')] bg-cover bg-center bg-no-repeat md:h-[105dvh]"
    >
      <div className="relative mx-auto flex w-full flex-1 flex-col items-center justify-center px-6 pb-6 pt-20 md:px-8 md:pb-0 md:pt-0">
        {/* Desktop decorations */}
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
          aria-hidden="true"
        >
          <Image
            src="/images/decoresImg/shining_star.png"
            alt=""
            width={47}
            height={67}
            className="bounce-effect absolute left-10 top-[18%] h-[67px] w-[47px] lg:left-20 xl:left-28"
            draggable={false}
          />

          <Image
            src="/images/decoresImg/shining_star.png"
            alt=""
            width={47}
            height={67}
            className="bounce-effect absolute right-10 top-[52%] h-[67px] w-[47px] lg:right-20 xl:right-28"
            draggable={false}
          />
        </div>

        <div className="relative z-10 w-full px-2 text-center md:px-4">
          {/* Title block — Figma mobile: 291px centered */}
          <div className="relative mx-auto w-[min(291px,100%)] md:w-auto">
            <Image
              src="/images/decoresImg/shining_star.png"
              alt=""
              width={25}
              height={34}
              className="bounce-effect absolute -left-[27px] -top-[60px] h-[34px] w-[25px] md:hidden"
              draggable={false}
            />

            <ScrollReveal duration={1}>
              <HeroHeading />
            </ScrollReveal>
          </div>

          {/* Subtitle block — Figma mobile: 222px centered, 41px below title */}
          <div className="relative mx-auto mt-[41px] w-fit max-w-full md:mt-[66px] md:w-auto">
            <ScrollReveal>
            <h6 className="whitespace-nowrap text-center font-annie text-[40px] font-normal leading-[57px] text-[#7A5944] md:text-[70px] md:leading-[100px]">
              <TypeWriter data={typoData} />
            </h6>
            </ScrollReveal>

            <Image
              src="/images/decoresImg/shining_star.png"
              alt=""
              width={30}
              height={40}
              className="bounce-effect absolute -right-1 top-full mt-[15px] h-[40px] w-[30px] md:hidden"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="w-full pb-4 md:mt-auto md:pb-6">
        <ScrollReveal baseOffset={16}>
          <SkillsAutoScroll />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
