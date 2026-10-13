"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { workData } from "@/Data/workData";

import WorkCard from "./WorkCard";

const CARD_WIDTH = 480;
// 4:3 image frame at CARD_WIDTH (see WorkCard)
const CARD_IMAGE_HEIGHT = (CARD_WIDTH * 3) / 4;
const SIDE_TILT = 28;
const CENTER_SCALE = 0.70;
const SIDE_SCALE = 0.76;
const STAGE_EDGE_GAP = 24;
const CARD_GAP = 40;

function getSideCenterOffset(stageWidth: number) {
  const centerHalf = (CARD_WIDTH * CENTER_SCALE) / 2;
  const sideHalf = (CARD_WIDTH * SIDE_SCALE) / 2;

  // Push side cards toward stage edges (justify-between)
  const edgeOffset = stageWidth / 2 - STAGE_EDGE_GAP - sideHalf;

  // Never pull side cards closer than the minimum gap from the center card
  const minOffset = centerHalf + sideHalf + CARD_GAP;

  return Math.max(minOffset, edgeOffset);
}

function getCardX(offset: number, stageWidth: number) {
  if (offset === 0) return 0;
  return offset * getSideCenterOffset(stageWidth);
}

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

function getStripStyle(
  offset: number,
  stageWidth: number,
  reducedMotion: boolean,
) {
  const abs = Math.abs(offset);
  const x = getCardX(offset, stageWidth);
  const isCenter = offset === 0;

  if (abs > 1) {
    return {
      transform: reducedMotion
        ? `translateX(calc(-50% + ${x}px))`
        : `translateX(calc(-50% + ${x}px)) rotateY(${offset * -SIDE_TILT}deg) translateZ(-80px) scale(0.82)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none" as const,
    };
  }

  if (reducedMotion) {
    return {
      transform: `translateX(calc(-50% + ${x}px))`,
      opacity: isCenter ? 1 : 0.55,
      zIndex: isCenter ? 30 : 20,
      pointerEvents: isCenter ? ("auto" as const) : ("none" as const),
    };
  }

  const rotateY = offset * -SIDE_TILT;
  const scale = isCenter ? CENTER_SCALE : SIDE_SCALE;
  const translateZ = isCenter ? 48 : -36;

  return {
    transform: `translateX(calc(-50% + ${x}px)) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
    opacity: isCenter ? 1 : 0.85,
    zIndex: isCenter ? 30 : 20,
    pointerEvents: isCenter ? ("auto" as const) : ("none" as const),
  };
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

type CarouselDotsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

function CarouselDots({ activeIndex, onSelect }: CarouselDotsProps) {
  return (
    <div
      className="mt-4 flex justify-center gap-2 md:mt-2"
      role="tablist"
      aria-label="Project slides"
    >
      {workData.map((card, index) => (
        <button
          key={`${card.title}-${index}`}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Go to ${card.title}`}
          onClick={() => onSelect(index)}
          className={`h-2 rounded-full transition-all ${
            index === activeIndex
              ? "w-6 bg-[#8A6C59]"
              : "w-2 bg-[#A28B7C]/40 hover:bg-[#A28B7C]/70"
          }`}
        />
      ))}
    </div>
  );
}

const WorkCardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(1200);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const total = workData.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateStageWidth = () => {
      setStageWidth(stage.clientWidth);
    };

    updateStageWidth();

    const observer = new ResizeObserver(updateStageWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  const transitionClass = reducedMotion
    ? ""
    : "transition-[transform,opacity] duration-500 ease-out";

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`Showing project ${activeIndex + 1} of ${total}: ${workData[activeIndex].title}`}
      </p>

      <div className="hidden min-w-0 md:block">
        <div className="flex w-full min-w-0 max-w-full items-start justify-between gap-4 lg:gap-10 xl:gap-14">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex shrink-0 items-center text-[#3C3C3C] transition-opacity hover:opacity-60"
            style={{ height: CARD_IMAGE_HEIGHT }}
          >
            <FiChevronLeft className="h-10 w-10" strokeWidth={1.5} />
          </button>

          <div
            ref={stageRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative min-w-0 flex-1 overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-[#8A6C59] focus-visible:ring-offset-2"
            style={{ height: CARD_IMAGE_HEIGHT + 170 }}
            aria-roledescription="carousel"
            aria-label="Featured work projects"
          >
            <div
              className={`h-full w-full overflow-visible ${reducedMotion ? "" : "[perspective:1200px] [perspective-origin:50%_38%]"}`}
            >
              <div
                className={`relative h-full w-full overflow-visible ${reducedMotion ? "" : "[transform-style:preserve-3d]"}`}
              >
                {workData.map((card, index) => {
                  const offset = getWrappedOffset(index, activeIndex, total);
                  const style = getStripStyle(offset, stageWidth, reducedMotion);
                  const isCenter = offset === 0;

                  return (
                    <div
                      key={`${card.title}-${index}`}
                      className={`absolute left-1/2 top-0 origin-center [backface-visibility:hidden] will-change-transform ${transitionClass}`}
                      style={{
                        width: CARD_WIDTH,
                        ...style,
                        // Keep transforms flat for reliable CTA hit-testing
                        transformStyle: "flat",
                        pointerEvents: isCenter ? "auto" : "none",
                      }}
                      aria-hidden={!isCenter}
                    >
                      <WorkCard
                        image={card.image}
                        title={card.title}
                        link={card.link}
                        isActive={isCenter}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex shrink-0 items-center text-[#3C3C3C] transition-opacity hover:opacity-60"
            style={{ height: CARD_IMAGE_HEIGHT }}
          >
            <FiChevronRight className="h-10 w-10" strokeWidth={1.5} />
          </button>
        </div>

        <CarouselDots activeIndex={activeIndex} onSelect={goTo} />
      </div>

      <div className="flex flex-col items-center gap-12 px-3 md:hidden">
        {workData.map((card, index) => (
          <WorkCard
            key={`${card.title}-${index}`}
            image={card.image}
            title={card.title}
            link={card.link}
            isActive
          />
        ))}
      </div>
    </div>
  );
};

export default WorkCardCarousel;
