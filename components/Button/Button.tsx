"use client";

import React from "react";
import Magnet from "../Animations/Magnet";

const buttonClassName =
  "font-montserrat border border-[#6D4C41] rounded-[10px] px-4 md:px-6 py-2 md:py-4 text-[#6D4C41] hover:bg-[#8A6C59] hover:text-white transition-all text-lg md:!text-[30px] font-medium cursor-pointer";

const Button = ({
  text,
  id = "btn",
  className = "",
  href,
  onClick,
}: {
  text: string;
  id?: string;
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const isExternal = Boolean(href?.startsWith("http"));
  const isHashLink = Boolean(href?.startsWith("#"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isHashLink && href) {
      event.preventDefault();
      const target = document.getElementById(href.slice(1));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClick?.(event);
  };

  const content = href ? (
    <a
      id={id}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={`${buttonClassName} pointer-events-auto relative z-10 inline-block ${className}`}
    >
      {text}
    </a>
  ) : (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      className={`${buttonClassName} pointer-events-auto relative z-10 ${className}`}
    >
      {text}
    </button>
  );

  return (
    <Magnet padding={50} disabled={false} magnetStrength={10}>
      {content}
    </Magnet>
  );
};

export default Button;
