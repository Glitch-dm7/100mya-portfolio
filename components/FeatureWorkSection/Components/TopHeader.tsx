import BlurText from '@/components/Animations/BlurText';
import SplitText from '@/components/Animations/SplitText';
import React from 'react';

interface TopHeadingProps {
  title: string;
  subTitle: string
}

const TopHeading: React.FC<TopHeadingProps> = ({ title, subTitle }) => {
  return (
    <div className="relative text-center">
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
          className="absolute top-[-20px] left-[-35px] rotate-[90deg] w-[47px] h-[67px] faded-effect "
          draggable={false}
        />
        <div className='text-[20px] md:text-[40px] font-annie max-w-[250px] md:max-w-[532px] text-wrap text-center mx-auto ' >
          <SplitText
            text={subTitle}
            delay={100}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
        <img
          src="/images/decoresImg/jigjag_arrow.png"
          alt="arrow"
          className="  absolute rotate-[45deg] md:rotate-0 bottom-[-20px] right-[-70px] md:bottom-0 md:right-[-35%] w-[70px] h-[80px] md:w-[160px] md:h-[170px] bounce-effect  "
          draggable={false}
        />
      </h2>
    </div>
  );
};

export default TopHeading;
