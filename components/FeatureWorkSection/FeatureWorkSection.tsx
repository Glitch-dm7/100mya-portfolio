"use client"
import React from 'react'
import TopHeading from './Components/TopHeader'
import dynamic from 'next/dynamic';

const WorkCardCarousel = dynamic(() => import('./Components/WorkCardCarousel'), {
  ssr: false,
});

const FeatureWorkSection = () => {
  return (
    <div id='work' className='bg-[#FFFCF2]'>
      {/* Top Heading */}
      <TopHeading
        title="Featured work"
        subTitle='Explore my work and discover the art of impactful design.'
      />


      {/* Work Card Carousel */}
      <WorkCardCarousel />

    </div>
  )
}

export default FeatureWorkSection