"use client";

import Image from "next/image";

type WorkCardProps = {
  image: string;
  title: string;
  link: string;
  isActive?: boolean;
};

const WorkCard = ({
  image,
  title,
  link,
  isActive = true,
}: WorkCardProps) => {
  return (
    <article
      className={`mx-auto w-full max-w-[358px] rounded-lg md:w-[480px] md:max-w-none ${
        isActive ? "opacity-100" : "opacity-80"
      }`}
      inert={!isActive ? true : undefined}
    >
      {/* Thumbnails are landscape (~4:3 to ~3:2), so use a 4:3 frame and
          contain the image to keep it fully visible without cropping. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#F3EEE4]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 480px, 358px"
          className="object-contain"
          draggable={false}
        />
      </div>
      <div className="relative z-50 mt-2 text-center font-montserrat md:mt-6">
        <h3 className="mb-3 text-lg font-bold uppercase tracking-wide md:text-[30px]">
          {title}
        </h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isActive ? 0 : -1}
          onClick={(event) => {
            if (!isActive) {
              event.preventDefault();
              return;
            }
            // Ensure navigation works even when parent 3D transforms
            // interfere with default anchor hit-testing.
            event.preventDefault();
            window.open(link, "_blank", "noopener,noreferrer");
          }}
          className="pointer-events-auto relative z-50 mt-2 inline-block cursor-pointer rounded-[10px] border border-[#6D4C41] px-4 py-2 font-montserrat text-lg font-medium text-[#6D4C41] transition-all hover:bg-[#8A6C59] hover:text-white md:mt-6 md:text-[24px]"
        >
          See work
        </a>
      </div>
    </article>
  );
};

export default WorkCard;
