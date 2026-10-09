import AnimatedContent from '@/components/Animations/AnimatedContent';
import React from 'react';

interface InfoBoxProps {
  text: string;
  ClassName?: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Optional positioning
}

const InfoBox: React.FC<InfoBoxProps> = ({ text, position = 'top', ClassName = '' }) => {
  return (

    <div
      className={` absolute font-montserrat inline-flex items-center px-4 bg-[#AE9382] text-white text-[14px] md:text-[22px] whitespace-nowrap  rounded-[10px] font-medium shadow-md ${position === 'top' ? 'mt-[-1.5rem]' : ''
        }  ${ClassName}`}
    >
      {text}
    </div>
  );
};

export default InfoBox;
