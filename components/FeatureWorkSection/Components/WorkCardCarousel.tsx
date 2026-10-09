import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'

import { Navigation } from 'swiper/modules';
import WorkCard from './WorkCard';
import { workData } from '@/Data/workData';
import AnimatedContent from '@/components/Animations/AnimatedContent';
import SpotlightCard from '@/components/Animations/SpotlightCard';
import Magnet from '@/components/Animations/Magnet';

const WorkCardCarousel = () => {
  return (
    <div className="w-full py-10 bg-[#FFFCF2]">
      <div className="hidden md:block slider-container mx-auto">
        <Swiper
          navigation={true}
          slidesPerView={3}
          centeredSlides={false} /* Change to false for standard alignment */
          spaceBetween={20} /* Adjust spacing between slides */
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {workData.map((card, index) => (
            <SwiperSlide key={index}>
              <AnimatedContent
                distance={250}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                {/* <Magnet padding={20} disabled={false} magnetStrength={10}> */}
                  <WorkCard image={card.image} title={card.title} link={card.link} />
                {/* </Magnet> */}
              </AnimatedContent>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col gap-4 md:hidden justify-center items-center ">

        {workData.map((card, index) => (
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            <WorkCard image={card.image} title={card.title} link={card.link} />
          </AnimatedContent>

        ))}
      </div>
    </div>
  );
};

export default WorkCardCarousel;
