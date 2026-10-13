import BlurText from '@/components/Animations/BlurText';
import SplitText from '@/components/Animations/SplitText';
import Image from 'next/image';
import React from 'react';

interface TopHeadingProps {
  title: string;
  subTitle: string
}

const TopHeading: React.FC<TopHeadingProps> = ({ title, subTitle }) => {
  return (
    <div className="relative text-center mb-2">
      <h2 className="relative inline-block text-[40px] md:text-[80px] font-nanum font-[800] text-[#3C3C3C]">
        <BlurText
          text={title}
          delay={150}
          animateBy="words"
          direction="top"
        />
        <Image
          src="/images/decoresImg/three_line.png"
          alt="Star Decor"
          width={47}
          height={67}
          className="absolute bottom-[37px] left-[-12px] h-[50px] w-[40px] rotate-90 faded-effect md:bottom-[80px] md:left-[-10px] md:h-[67px] md:w-[47px]"
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
      <Image
        src="/images/decoresImg/shining_star.png"
        alt="Star Decor"
        width={40}
        height={53}
        className="absolute bottom-0 right-[5%] h-[35px] w-[25px] md:left-[70%] md:h-[53px] md:w-[40px]"
        draggable={false}
      />
    </div>
  );
};

export default TopHeading;
