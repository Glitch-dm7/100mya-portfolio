import Magnet from '@/components/Animations/Magnet';
import React from 'react';

const WorkCard = ({ image, title, link }: { image: string, title: string, link: string }) => {
  return (
    <div className="w-[358px] max-w-full md:w-full flex flex-col h-full">
      {/* Fixed aspect frame so every card is the same size; `curve-media` gets the arc transform */}
      <div className="curve-media w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center flex-1 mt-2 md:mt-6 p-6 text-center font-montserrat">
        {/* Reserve two lines so buttons line up regardless of title length */}
        <h3 className="text-lg md:text-[24px] leading-tight font-bold mb-3 line-clamp-2 min-h-[2.5em]">{title}</h3>

        <Magnet padding={100} disabled={false} magnetStrength={10}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={` font-montserrat border border-[#6D4C41] rounded-[10px] px-4 py-2 text-[#6D4C41] hover:bg-[#8A6C59] hover:text-white transition-all text-lg md:text-[24px] font-medium cursor-pointer inline-block mt-2 md:mt-4  `}>
            See work
          </a>
        </Magnet>
      </div>
    </div>
  );
};

export default WorkCard;
