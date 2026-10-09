import React from 'react';
import InfoBox from './Components/InfoBoxProps';
import Button from '../Button/Button';
import SplitText from '../Animations/SplitText';
import BlurText from '../Animations/BlurText';
import AnimatedContent from '../Animations/AnimatedContent';

const AboutMeSection = () => {
  return (
    <div id='achievements' className='bg-[#FFF3E8]'>

      <div className=" w-full font-nanum text-[48px] md:text-[80px] text-[#3C3C3C] font-[800] mb-4 text-center mx-auto flex justify-center items-center ">
        {/* <BlurText
          text={'Ab@ut me'}
          delay={150}
          animateBy="words"
          direction="top"
        /> */}
        Ab
        <img src="/images/@.png" alt="@ img" className='w-[25px] h-[35px] md:w-[33px] md:h-[52px]' />
        ut me
      </div>

      <div className=" py-16 px-6 pt-0 lg:px-24 flex flex-col md:flex-row items-center justify-center gap-20">
        {/* Left Section - About Text */}
        <div className="order-2 md:order-1 w-full md:w-[60%] text-left ">
          <AnimatedContent
            distance={200}
            direction="horizontal"
            reverse={true}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            <h6 className="font-montserrat text-[18px] md:text-[40px] leading-[1.4] text-[#333]">
              I’m <span className="relative font-bold ">
                SAUMYA GAUTAM
                <InfoBox
                  text='Dehli'
                  ClassName='md:bottom-[-25px] left-0'
                />
              </span>

              , a <span className='relative'>UX/UI<InfoBox
                text='2 years'
                ClassName='top-[-10px] left-[90%]'
              />
              </span> designer driven by{' '}

              <span className="font-bold">CURIOSITY</span> and <span className="font-bold">CREATIVITY</span>. I specialize in crafting intuitive,{' '}
              <span className="relative font-bold">
                USER-CENTERED DESIGNS
                <InfoBox
                  text='Empathy'
                  ClassName='bottom-[-25px] left-[40%]'
                />
              </span> that solve real-world problems.
            </h6>
          </AnimatedContent>

          <AnimatedContent
            distance={250}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            <Button text={'Let’s Connect'} className='mt-4 md:mt-6' />
          </AnimatedContent>
        </div>

        {/* Right Section - Image and Highlights */}
        <div className=" flex items-center justify-center order-1 md:order-2 w-full md:w-[40%]">
          <AnimatedContent
            distance={250}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            <div className='relative '>
              {/* Profile Image */}
              <div className='z-10'>
                <div className="relative w-[213px] h-[244px] md:w-[426px] md:h-[489px] inline-block z-10 bg-[#F9F8F7] shadow-lg p-4  ">
                  <img
                    src="/images/Saumya.jpg"
                    alt="Somya Gautam"
                    className=" rotate-2 aspect-[401/374] object-cover object-right"
                  />
                  {/* Caption */}
                  <div className="mt-4 text-center font-annie text-[20px] md:text-[40px]  italic text-[#656565]">
                    Saumya Gautam
                  </div>

                  <img
                    src="/images/decoresImg/three_line.png"
                    alt="Star Decor"
                    className="absolute top-[-25px] left-[-20px] rotate-90 w-[47px] h-[67px] faded-effect "
                    draggable={false}
                  />
                </div>

              </div>

              {/* Polaroid Frame Effect */}
              <div className="w-[213px] h-[244px] md:w-[426px] md:h-[489px] absolute top-0 left-0 bg-white shadow-lg transform rotate-[-4deg] z-0"></div>
              <div className="w-[213px] h-[244px] md:w-[426px] md:h-[489px] absolute top-0 left-0 bg-white shadow-lg transform rotate-[2deg] z-0"></div>
            </div>
          </AnimatedContent>
        </div>

      </div>
    </div>
  );
};

export default AboutMeSection;
