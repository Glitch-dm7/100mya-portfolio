import React from 'react'
import Magnet from '../Animations/Magnet'

const Button = ({ text, id = 'btn', className = '' }: { text: string, id?: string, className?: string }) => {
  return (
    <Magnet padding={50} disabled={false} magnetStrength={10}>
      <button id={id} className={` font-montserrat border border-[#6D4C41] rounded-[10px] px-4 md:px-6 py-2 md:py-4 text-[#6D4C41] hover:bg-[#8A6C59] hover:text-white transition-all text-lg md:!text-[30px] font-medium ${className} cursor-pointer `}>
        {text}
      </button>
    </Magnet>
  )
}

export default Button