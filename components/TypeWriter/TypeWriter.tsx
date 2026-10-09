"use client"
import React from 'react'
import TypewriterComponent from 'typewriter-effect'

const TypeWriter = ({ data }: { data: string[] }) => {
  return (
    <TypewriterComponent
      options={{
        strings: data,
        autoStart: true,
        loop: true,
      }}
    />
  )
}

export default TypeWriter