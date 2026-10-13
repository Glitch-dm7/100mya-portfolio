"use client"
import React from 'react'
import TypewriterComponent from 'typewriter-effect'

const TypeWriter = ({ data }: { data: string[] }) => {
  const longest = data.reduce((a, b) => (a.length > b.length ? a : b))

  return (
    <span className="inline-grid whitespace-nowrap">
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        <TypewriterComponent
          options={{
            strings: data,
            autoStart: true,
            loop: true,
          }}
        />
      </span>
    </span>
  )
}

export default TypeWriter
