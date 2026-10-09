import React from 'react';
import SkillsAutoScroll from './components/SkillsAutoScroll';
import TypeWriter from '../TypeWriter/TypeWriter';
import FadeContent from '../Animations/FadeContent';

const typoData: string[] = [
  'ux and ui design',
  'curiosity and innovation',
  'strategy and process',
]

const HeroSection = () => {
  return (
    <div
      id="home"
      className="h-[100vh] flex items-center justify-center flex-col relative bg-background bg-no-repeat bg-cover bg-[url('/images/dots-bg.png'),url('/images/bg-gradient.png')] bg-center"
    >
      {/* Hero Text */}
      <div className="relative text-center px-4 mb-[80px] ">
        {/* Decorative Props */}
        <img
          src="/images/decoresImg/shining_star.png"
          alt="Star Decor"
          className="absolute top-[-8rem] left-[3rem] w-[47px] h-[67px] bounce-effect "
          draggable={false}
        />

        <FadeContent blur={true} duration={1500} easing="ease-out" initialOpacity={0}>

          <h1 className="hidden md:block font-nanum text-[52px] md:text-[120px] leading-[52px]  md:leading-[130px] font-[800] ">
            Shaping <span className="relative inline-block">
              <span className="relative font-nanum text-[48px] md:text-[120px] font-[800] italic  ">
                ideas
                <img
                  src="/images/decoresImg/idea_eclipse.png"
                  alt="Eclipse Decor"
                  className="absolute top-[-30px] w-[382px] h-[100px] md:h-[185px] cicular-effect"
                />
              </span>{' '}
              into
            </span>
            <br />
            intuitive experiences with
          </h1>

          <h1 className="block md:hidden font-nanum text-[52px] md:text-[120px] leading-[52px]  md:leading-[130px] font-[800] ">
            Shaping {" "}
            <span className="relative font-nanum text-[48px] md:text-[120px] font-[800] italic ">
              ideas
              <img
                src="/images/decoresImg/idea_eclipse.png"
                alt="Eclipse Decor"
                className="absolute top-[-30px] left-0 w-[382px] h-[100px] md:h-[185px] cicular-effect "
              />
            </span>{' '}
            into intuitive experiences with

          </h1>
        </FadeContent>
        {/* Curve Arrow */}
        <img
          src="/images/decoresImg/curve_arrow.png"
          alt="Curve Arrow"
          className="absolute bottom-[3.5rem] left-[65%] rotate-[-80deg] md:bottom-[1.5rem] md:left-[70%] w-[4rem]  md:w-40 md:rotate-[-8deg] "
        />
        <img
          src="/images/decoresImg/shining_star.png"
          alt="Star Decor"
          className="absolute bottom-[-4rem] right-[0rem] w-[47px] h-[67px] bounce-effect "
          draggable={false}
        />
        {/* Typewriter Effect */}
        <h6 className="font-annie text-[40px] md:text-[70px] italic text-[#6D4C41] mt-2">
          <TypeWriter data={typoData} />
        </h6>

      </div>

      {/*  Skills Feature AutoScroll Section */}
      <SkillsAutoScroll />

    </div >
  );
};

export default HeroSection;
