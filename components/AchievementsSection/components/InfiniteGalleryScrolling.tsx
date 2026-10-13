"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import GalleryCard from "./GalleryCard";
import Magnet from "@/components/Animations/Magnet";
import Image from "next/image";

const SCROLL_DURATION_MS = 200_000;
const COPY_COUNT = 3;
const DRAG_THRESHOLD_PX = 3;

type AchievementItem = {
  icon: string;
  image: string;
  caption: string;
};

function normalizeOffset(offset: number, setWidth: number) {
  if (setWidth <= 0) return offset;

  while (offset <= -setWidth) {
    offset += setWidth;
  }

  while (offset > 0) {
    offset -= setWidth;
  }

  return offset;
}

const InfiniteGalleryScrolling = ({ data }: { data: AchievementItem[] }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const speedPxPerMsRef = useRef(0);
  const isDraggingRef = useRef(false);
  const pointerActiveRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const measureTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackWidth = track.scrollWidth;
    const setWidth = trackWidth / COPY_COUNT;

    setWidthRef.current = setWidth;
    speedPxPerMsRef.current = trackWidth / SCROLL_DURATION_MS;
    offsetRef.current = normalizeOffset(offsetRef.current, setWidth);
    applyTransform();
  }, [applyTransform]);

  useLayoutEffect(() => {
    measureTrack();

    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => {
      measureTrack();
    });

    observer.observe(track);

    return () => observer.disconnect();
  }, [measureTrack, data]);

  useEffect(() => {
    let rafId = 0;

    const tick = (time: number) => {
      const last = lastFrameTimeRef.current;
      lastFrameTimeRef.current = time;

      if (last !== null && !document.hidden && !isDraggingRef.current) {
        const deltaMs = time - last;
        const setWidth = setWidthRef.current;
        const speed = speedPxPerMsRef.current;

        if (setWidth > 0 && speed > 0) {
          offsetRef.current -= speed * deltaMs;
          offsetRef.current = normalizeOffset(offsetRef.current, setWidth);
          applyTransform();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [applyTransform]);

  const endDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) {
        return;
      }

      pointerActiveRef.current = false;
      isDraggingRef.current = false;
      setIsDragging(false);
      pointerIdRef.current = null;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      const setWidth = setWidthRef.current;
      if (setWidth > 0) {
        offsetRef.current = normalizeOffset(offsetRef.current, setWidth);
        applyTransform();
      }
    },
    [applyTransform]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    pointerActiveRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerActiveRef.current || pointerIdRef.current !== e.pointerId) {
      return;
    }

    const deltaX = e.clientX - dragStartXRef.current;

    if (!isDraggingRef.current) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;

      isDraggingRef.current = true;
      setIsDragging(true);
    }

    offsetRef.current = dragStartOffsetRef.current + deltaX;

    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      const normalized = normalizeOffset(offsetRef.current, setWidth);

      if (normalized !== offsetRef.current) {
        offsetRef.current = normalized;
        dragStartOffsetRef.current = normalized;
        dragStartXRef.current = e.clientX;
      }
    }

    applyTransform();
  };

  const renderItem = (item: AchievementItem, index: number, copyId: string) => (
    <div key={`${copyId}-${index}`} className="flex items-center gap-12">
      <Image
        src={item.icon}
        alt=""
        width={160}
        height={160}
        className="h-auto w-24 rotate-[-8deg] md:w-40"
      />
      {copyId === "set-0" ? (
        <Magnet padding={50} disabled={isDragging} magnetStrength={10}>
          <GalleryCard
            index={index}
            image={item.image}
            caption={item.caption}
          />
        </Magnet>
      ) : (
        <GalleryCard
          index={index}
          image={item.image}
          caption={item.caption}
        />
      )}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={`relative my-20 overflow-visible py-10 md:py-14 select-none touch-pan-y ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-12 overflow-visible will-change-transform"
      >
        {data.map((item, index) => renderItem(item, index, "set-0"))}
        {data.map((item, index) => renderItem(item, index, "set-1"))}
        {data.map((item, index) => renderItem(item, index, "set-2"))}
      </div>
    </div>
  );
};

export default InfiniteGalleryScrolling;
