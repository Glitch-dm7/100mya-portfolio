import React from 'react'
import Features from './Features'


const SkillsAutoScroll = () => {
  return (
    <div className='w-full bg-[#FFEFD8] overflow-hidden h-[141px] '>
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FFFBF5] to-[#F8EFEF] py-4 rotate-[-1deg] inline-flex whitespace-nowrap ">

        {/* Repeating Content */}
        <div className="flex items-center space-x-8 animate-marquee ml-3">
          <Features />
        </div>
        <div className="flex items-center space-x-8 animate-marquee ml-3">
          <Features />
        </div>
        <div className="flex items-center space-x-8 animate-marquee mx-3">
          <Features />
        </div>
        
      </div>
    </div>

  )
}

export default SkillsAutoScroll