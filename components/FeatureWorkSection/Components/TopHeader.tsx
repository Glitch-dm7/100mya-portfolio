import BlurText from "@/components/Animations/BlurText";
import SplitText from "@/components/Animations/SplitText";
import Image from "next/image";

interface TopHeadingProps {
  title: string;
  subTitle: string;
}

const TopHeading = ({ title, subTitle }: TopHeadingProps) => {
  return (
    <div className="relative mb-10 text-center md:mb-16">
      <h2 className="relative inline-block font-nanum text-[40px] font-[800] text-[#3C3C3C] md:text-[80px]">
        <BlurText text={title} delay={150} animateBy="words" direction="top" />
        <Image
          src="/images/decoresImg/three_line.png"
          alt=""
          width={47}
          height={67}
          className="faded-effect absolute left-[-35px] top-[-20px] h-[67px] w-[47px] rotate-90 md:left-[-40px] md:top-[-24px]"
          draggable={false}
        />
        <div className="pointer-events-none absolute bottom-[-90px] right-[-35%] z-10 hidden h-[170px] w-[160px] md:block">
          <Image
            src="/images/decoresImg/jigjag_arrow.png"
            alt=""
            fill
            className="bounce-effect object-contain"
            draggable={false}
          />
        </div>
      </h2>
      <div className="relative mx-auto mt-4 max-w-[250px] font-annie text-[20px] text-[#3C3C3C] md:mt-6 md:max-w-[532px] md:text-[40px]">
        <div className="pointer-events-none absolute bottom-[-10px] right-[-50px] z-10 h-[80px] w-[70px] rotate-45 md:hidden">
          <Image
            src="/images/decoresImg/jigjag_arrow.png"
            alt=""
            fill
            className="bounce-effect object-contain"
            draggable={false}
          />
        </div>
        <SplitText
          text={subTitle}
          delay={100}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
    </div>
  );
};

export default TopHeading;
