import AnimatedContent from "../Animations/AnimatedContent";
import Button from "../Button/Button";
import InfoBox from "./Components/InfoBoxProps";
import Image from "next/image";

const AboutMeSection = () => {
  return (
    <section id="about" className="bg-[#FFF3E8] py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1512px] px-4 md:px-16 lg:px-[80px]">
        <h2 className="mb-10 flex items-center justify-center font-nanum text-[48px] font-[800] text-[#3C3C3C] md:mb-14 md:text-[80px] lg:mb-16">
          Ab
          <Image
            src="/images/@.png"
            alt=""
            width={33}
            height={52}
            className="h-[35px] w-[25px] md:h-[52px] md:w-[33px]"
            draggable={false}
          />
          ut me
        </h2>

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20 xl:gap-24">
          <div className="order-2 w-full md:order-1 md:max-w-[780px] md:flex-[1.15] md:text-left">
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
              <p className="relative mx-auto max-w-[358px] text-center font-montserrat text-[20px] font-medium leading-[28px] text-[#3C3C3C] md:mx-0 md:max-w-none md:text-left md:text-[40px] md:leading-[60px] md:tracking-[0.02em]">
                I&apos;m{" "}
                <span className="relative inline whitespace-nowrap font-bold">
                  SAUMYA GAUTAM
                  <InfoBox
                    text="Delhi"
                    className="left-0 top-full -translate-y-1/3 md:left-2 md:-translate-y-1/3"
                  />
                </span>
                , a{" "}
                <span className="relative inline">
                  UX/UI
                  <InfoBox
                    text="2 years"
                    className="-top-4 left-[84%] -translate-x-1/2 md:bottom-full md:left-[calc(100%+0.05em)] md:top-auto md:translate-x-0"
                  />
                </span>{" "}
                designer driven by <span className="font-bold">CURIOSITY</span>{" "}
                and <span className="font-bold">CREATIVITY</span>. I specialize
                in crafting intuitive,{" "}
                <span className="relative inline font-bold">
                  USER-CENTERED
                  <InfoBox
                    text="Empathy"
                    className="left-1/2 top-full -translate-x-1/2 -translate-y-1/3 md:left-[20%] md:translate-x-0 md:-translate-y-1/4"
                  />
                </span>{" "}
                <span className="font-bold">DESIGNS</span> that solve real-world
                problems.
              </p>
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
              <p className="mt-8 font-annie text-[28px] leading-tight tracking-[0.03em] text-[#202020] md:mt-10 md:text-[44px]">
                Let&apos;s make great ideas happen!
              </p>

              <div className="mt-6 flex justify-center md:mt-8 md:justify-start">
                <Button
                  text="Let's Connect"
                  href="#contact"
                  className="rounded-md border-[#8A6C59] font-semibold text-[#8A6C59] md:!text-[20px]"
                />
              </div>
            </AnimatedContent>
          </div>

          <div className="order-1 flex w-full justify-center md:order-2 md:flex-1 md:justify-end">
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
              <div className="relative w-[213px] md:w-[427px]">
                <div
                  className="absolute inset-0 bg-[#F9F8F7] shadow-[0_3px_34px_rgba(0,0,0,0.15)] rotate-[-4deg]"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 translate-x-1 translate-y-1 bg-[#F9F8F7] shadow-[0_3px_34px_rgba(0,0,0,0.15)] rotate-[3deg]"
                  aria-hidden
                />

                <div className="relative z-10 bg-[#F9F8F7] p-3 shadow-[0_3px_34px_rgba(0,0,0,0.15)] md:p-5">
                  <Image
                    src="/images/Saumya.jpg"
                    alt="Saumya Gautam"
                    width={376}
                    height={348}
                    className="aspect-[376/348] w-full rotate-[2deg] object-cover object-right"
                    draggable={false}
                  />
                  <p className="mt-3 text-center font-annie text-[20px] text-[#656565] md:mt-4 md:text-[40px] md:leading-[57px]">
                    Saumya Gautam
                  </p>

                  <Image
                    src="/images/decoresImg/three_line.png"
                    alt=""
                    width={47}
                    height={67}
                    className="faded-effect absolute left-[-20px] top-[-25px] h-[50px] w-[40px] rotate-90 md:h-[67px] md:w-[47px]"
                    draggable={false}
                  />
                </div>

                <Image
                  src="/images/decoresImg/shining_star.png"
                  alt=""
                  width={40}
                  height={53}
                  className="absolute bottom-[-8px] right-[-12px] z-20 h-[35px] w-[25px] md:bottom-[-4px] md:right-[-16px] md:h-[53px] md:w-[40px]"
                  draggable={false}
                />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
