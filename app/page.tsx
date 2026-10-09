import AboutMeSection from '@/components/AboutMeSection/AboutMeSection'
import AchievementSection from '@/components/AchievementsSection/AchievementSection'
import ContactSection from '@/components/ContactSection/ContactSection'
import FeatureWorkSection from '@/components/FeatureWorkSection/FeatureWorkSection'
import HeroSection from '@/components/HeroSection/HeroSection'
import React from 'react'

const page = () => {
  return (
    <div className="">
      <HeroSection />
      <FeatureWorkSection />
      <AboutMeSection />
      <AchievementSection />
      <ContactSection />

    </div>
  )
}

export default page


// fixed inset-0 -z-10 h-[200vh] w-full bg-[#FAF9F6] bg-[linear-gradient(to_right,#DEDCD3_1px,transparent_1px)] bg-[size:12rem] md:bg-[size:24rem] bg-center