import React from 'react';
import TopHeading from './components/TopHeading';
import { achievementsData } from '@/Data/Achievements';
import InfiniteGalleryScrolling from './components/InfiniteGalleryScrolling';

const AchievementSection = () => {
  return (
    <div className="bg-[#FFFCF2] py-16 overflow-hidden ">
      <div className="container mx-auto ">
        {/* Top Heading */}
        <TopHeading
          title="Achievements so far"
          subTitle='Let’s explore my journey'
        />

        {/* Infinite Scrolling Gallery */}
        <InfiniteGalleryScrolling
          data={achievementsData}
        />

      </div>
    </div>
  );
};

export default AchievementSection;

