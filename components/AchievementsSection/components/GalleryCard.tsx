import React from 'react';
import Image from 'next/image';

interface GalleryCardProps {
  image: string;
  caption: string;
  index: number;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image, caption, index }) => {
  return (
    <div className={`max-w-[326px] md:max-w-[426px] h-[389px] md:h-[489px] inline-block z-10 bg-[#F9F8F7] shadow-lg p-6 ${index % 2 === 0 ? 'rotate-[-5deg]' : 'rotate-[5deg]'}  `}>
      <Image
        src={image}
        alt={caption}
        width={376}
        height={348}
        className="h-[248px] w-[276px] object-cover object-top md:h-[348px] md:w-[376px]"
      />
      {/* Caption */}
      <div className="mt-4 text-center font-annie text-[20px] md:text-[30px]  italic text-[#656565]">
        {caption}
      </div>
    </div>

  );
};

export default GalleryCard;
