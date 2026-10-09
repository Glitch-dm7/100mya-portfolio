import Link from 'next/link'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import BlurText from '../Animations/BlurText'
import SplitText from '../Animations/SplitText'
import AnimatedContent from '../Animations/AnimatedContent'
import { MdMailOutline } from 'react-icons/md'

const ContactSection = () => {
  return (
    <>
      <div id='contact' className=" inset-0 -z-10 h-auto w-full bg-[#8A6C59] bg-[linear-gradient(to_right,#FDF8E71A_1px,transparent_1px)] bg-[size:12rem] md:bg-[size:24rem] bg-center rounded-t-[50px] text-white ">

        <BlurText
          text="LET’S CONNECT"
          delay={250}
          animateBy="letters"
          direction="top"
          // onAnimationComplete={handleAnimationComplete}
          className=' text-[44px] lg:text-[180px] text-center font-montserrat font-[800] text-white py-6 md:py-3 pl-5 md:pl-0 '
        />

        {/* <SplitText
          text="LET’S CONNECT"
          className=' text-[44px] lg:text-[180px] text-center font-montserrat font-[800] text-white py-6 md:py-3 '
          delay={150}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          threshold={0.2}
          // rootMargin="-50px"
        /> */}
        {/* <h1 >

        </h1> */}

        <div className=' flex justify-between flex-col md:flex-row gap-10 md:gap-1  items-center px-6 md:px-20 pt-10 pb-16 '>
          <div className=' relative w-[60%] md:w-[335px] font-annie text-[16px] md:text-[30px]'>
            <AnimatedContent
              distance={150}
              direction="horizontal"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <p>I am currently available for new
                work, let me know if you need a
                UX/UI Designer. I’d love to
                talk about the next big thing!</p>
              <img
                src="/images/decoresImg/light_three_lines.png"
                alt="Star Decor"
                className="absolute top-[-20px] left-[-20px] md:top-[-40px] md:left-[-45px] rotate-0 w-[20px] h-[30px] md:w-[47px] md:h-[67px] text-white "
                draggable={false}
              />
            </AnimatedContent>
          </div>

          <div className=' flex md:hidden items-center justify-center text-[16px] md:text-2xl gap-3 '>
            <MdMailOutline size={25} />
            <span>gautam.saumya11@gmail.com</span>
          </div>

          <ul className=' flex flex-row md:flex-col gap-9 md:gap-2'>
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <Link href={'https://www.instagram.com/ui.saumya/'}>
                <li className='flex items-center gap-2 underline text-[14px] md:text-[30px] '>Instagram <FiArrowUpRight /> </li>
              </Link>
            </AnimatedContent>
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <Link href={'https://www.linkedin.com/in/saumya-gautam-a9731b214/'} >
                <li className='flex items-center gap-2 underline text-[14px] md:text-[30px] '>LinkedIn <FiArrowUpRight /> </li>
              </Link>
            </AnimatedContent>
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <Link href={'https://www.behance.net/saumyagautam2'}>
                <li className='flex items-center gap-2 underline text-[14px] md:text-[30px] '>Behance <FiArrowUpRight /> </li>
              </Link>
            </AnimatedContent>
          </ul>

        </div>

        <div className='hidden md:flex items-center justify-center pb-10 text-2xl gap-3 '>
          <MdMailOutline size={25} />
          <span>gautam.saumya11@gmail.com</span>
        </div>

      </div>
    </>
  )
}

export default ContactSection