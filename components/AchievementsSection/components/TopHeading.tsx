import BlurText from '@/components/Animations/BlurText';
import SplitText from '@/components/Animations/SplitText';
import React from 'react';

interface TopHeadingProps {
  title: string;
  subTitle: string
}

const TopHeading: React.FC<TopHeadingProps> = ({ title, subTitle }) => {
  return (
    <div className="relative text-center mb-8">
      <h2 className="relative inline-block text-[40px] md:text-[80px] font-nanum font-[800] text-[#3C3C3C]">
        <BlurText
          text={title}
          delay={150}
          animateBy="words"
          direction="top"
        />
        <img
          src="/images/decoresImg/three_line.png"
          alt="Star Decor"
          className="absolute bottom-[37px] md:bottom-[80px] left-[-12px] md:left-[-10px] rotate-90  w-[40px] h-[50px]  md:w-[47px] md:h-[67px] faded-effect "
          draggable={false}
        />

      </h2>
      <div className=' text-[20px] md:text-[40px] font-annie ' >
        <SplitText
          text={subTitle}
          delay={150}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
      <img
        src="/images/decoresImg/shining_star.png"
        alt="Star Decor"
        className="absolute bottom-0 right-[5%] md:left-[70%] w-[25px] h-[35px] md:w-[40px] md:h-[53px] "
        draggable={false}
      />
    </div>
  );
};

export default TopHeading;
