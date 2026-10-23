"use client";

// Adapted from React Bits: preserve semantic children and the site's typography.
import { Children, useLayoutEffect, useMemo, useRef, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

type Effect = "fade" | "rise" | "flip" | "scale";
type ScrollRevealProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  highlightColor?: string | null;
  mode?: "scrub" | "enter";
  splitBy?: "words" | "chars" | "lines";
  effect?: Effect;
  stagger?: number;
  duration?: number;
  smoothing?: number;
  baseOpacity?: number;
  baseRotation?: number;
  baseOffset?: number;
  enableBlur?: boolean;
  blurStrength?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  containerClassName?: string;
  textClassName?: string;
  /** Reveal marked descendants individually, without adding layout wrappers. */
  itemSelector?: string;
  as?: "div" | "span";
};

type Look = {
  effect: Effect;
  masked: boolean;
  baseOpacity: number;
  blur: number;
  offset: number;
  highlightColor: string | null;
};

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const smooth = (value: number) => value * value * (3 - 2 * value);
const clampToScroll = (position: string) => position.startsWith("clamp(") ? position : `clamp(${position})`;

function easeBack(value: number, overshoot: number) {
  const shifted = value - 1;
  return 1 + (overshoot + 1) * shifted ** 3 + overshoot * shifted ** 2;
}

function paintPiece(piece: HTMLElement, t: number, look: Look) {
  let reveal = t;
  let fadeIn = t;
  let motion = "";
  if (look.effect === "rise") {
    reveal = 1 - (1 - t) ** 3;
    fadeIn = clamp01(reveal * 1.25);
    if (reveal < 1) motion = look.masked
      ? `translateY(${(1 - reveal) * 100}%) translateY(${(1 - reveal) * 0.2}em)`
      : `translateY(${(1 - reveal) * 0.8}em)`;
  } else if (look.effect === "flip") {
    reveal = easeBack(t, 1.2);
    fadeIn = clamp01(t * 2);
    if (t < 1) motion = `perspective(6em) rotateX(${(1 - reveal) * 90}deg)`;
  } else if (look.effect === "scale") {
    reveal = easeBack(t, 1.6);
    fadeIn = clamp01(t * 1.6);
    if (t < 1) motion = `scale(${0.35 + 0.65 * reveal})`;
  }
  if (look.highlightColor) fadeIn = Math.max(fadeIn, clamp01(t / 0.35));
  const settle = clamp01(reveal);
  const lift = look.offset * (1 - settle);
  piece.style.opacity = t >= 1 ? "" : `${look.baseOpacity + (1 - look.baseOpacity) * fadeIn}`;
  piece.style.transform = [lift ? `translateY(${lift}px)` : "", motion].filter(Boolean).join(" ");
  piece.style.filter = look.blur && settle < 1 ? `blur(${look.blur * (1 - settle)}px)` : "";
  if (look.highlightColor) {
    const glow = t <= 0 || t >= 1 ? 0 : t < 0.35 ? smooth(t / 0.35) : 1 - smooth((t - 0.35) / 0.65);
    piece.style.color = glow > 0.002 ? `color-mix(in srgb, ${look.highlightColor} ${glow * 100}%, currentColor)` : "";
  }
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  baseOffset = 24,
  stagger = 0.08,
  smoothing = 0,
  splitBy = "words",
  effect = "fade",
  mode = "enter",
  duration = 0.8,
  highlightColor = "",
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  itemSelector,
  as: Container = "div",
  className = "",
  ...restProps
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const text = useMemo(() => {
    const parts = Children.toArray(children);
    return parts.every((part) => typeof part === "string" || typeof part === "number") ? parts.join("") : null;
  }, [children]);
  const TextContainer = text === null ? "div" : "span";

  useLayoutEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl || (scrollContainerRef && !scrollContainerRef.current)) return;
    gsap.registerPlugin(ScrollTrigger);
    const scroller = scrollContainerRef?.current ?? window;
    const wrappers = Array.from(textEl.querySelectorAll<HTMLElement>(".scroll-reveal-word"));
    const pieces = itemSelector
      ? Array.from(textEl.querySelectorAll<HTMLElement>(itemSelector))
      : wrappers.length ? Array.from(textEl.querySelectorAll<HTMLElement>(".scroll-reveal-piece")) : [textEl];
    const viewportHeight = () => scroller instanceof HTMLElement ? scroller.clientHeight : window.innerHeight;
    const span = mode === "enter" ? Math.max(0.05, duration) : 0.5;
    const gap = Math.max(0, stagger);
    const look: Look = { effect, masked: effect === "rise" && wrappers.length > 0 && !itemSelector, baseOpacity, blur: enableBlur ? blurStrength : 0, offset: baseOffset, highlightColor };
    const mm = gsap.matchMedia();
    let live = true;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const order = pieces.map((_, index) => index);
      const last = pieces.map(() => -1);
      const state = { p: 0 };
      let count = pieces.length;
      let played = false;
      let tween: gsap.core.Tween | undefined;
      let rotationTween: gsap.core.Tween | undefined;
      const savedStyles = pieces.map((piece) => piece.getAttribute("style"));
      const savedMasks = wrappers.map((wrapper) => wrapper.style.clipPath);
      const measure = () => {
        if (splitBy !== "lines" || !wrappers.length || itemSelector) return;
        let line = -1;
        let top = -Infinity;
        wrappers.forEach((wrapper, index) => {
          if (Math.abs(wrapper.offsetTop - top) > 2) { line += 1; top = wrapper.offsetTop; }
          order[index] = line;
        });
        count = line + 1;
      };
      const total = () => span + Math.max(0, count - 1) * gap;
      const render = () => {
        const at = state.p * total();
        pieces.forEach((piece, index) => {
          const t = clamp01((at - order[index] * gap) / span);
          if (t === last[index]) return;
          last[index] = t;
          paintPiece(piece, t, look);
          piece.style.willChange = t >= 1 || pieces.length > 80 ? "" : "opacity, transform";
        });
      };
      const finish = () => {
        played = true;
        tween?.kill();
        rotationTween?.kill();
        state.p = 1;
        render();
        if (baseRotation) gsap.set(el, { rotate: 0 });
      };
      measure();
      if (look.masked) wrappers.forEach((wrapper) => { wrapper.style.clipPath = "inset(-1em -1em -0.15em -1em)"; });
      if (effect === "flip") pieces.forEach((piece) => { piece.style.transformOrigin = "50% 100%"; });
      render();

      if (mode === "enter") {
        const play = () => {
          if (played) return;
          played = true;
          tween = gsap.to(state, { p: 1, duration: total(), ease: "none", onUpdate: render });
          if (baseRotation) rotationTween = gsap.to(el, { rotate: 0, duration: Math.min(total(), 1.4), ease: "power3.out" });
        };
        if (baseRotation) gsap.set(el, { transformOrigin: "0% 50%", rotate: baseRotation });
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: () => {
            const top = el.getBoundingClientRect().top - (scroller instanceof HTMLElement
              ? scroller.getBoundingClientRect().top + scroller.clientTop - scroller.scrollTop : -window.scrollY);
            return Math.min(top - viewportHeight() + 0.2 * Math.min(el.offsetHeight, viewportHeight()), ScrollTrigger.maxScroll(scroller) - 1);
          },
          once: true,
          onEnter: play,
          onLeave: play,
          onRefresh: (self) => { if (self.progress > 0) play(); },
        });
      } else {
        if (baseRotation) gsap.fromTo(el, { transformOrigin: "0% 50%", rotate: baseRotation }, {
          rotate: 0, ease: "none", scrollTrigger: { trigger: el, scroller, start: "top bottom", end: clampToScroll(rotationEnd), scrub: smoothing > 0 ? smoothing : true },
        });
        tween = gsap.to(state, { p: 1, ease: "none", onUpdate: render, scrollTrigger: {
          trigger: el, scroller, start: () => `top bottom-=${0.2 * Math.min(el.offsetHeight, viewportHeight())}`,
          end: clampToScroll(wordAnimationEnd), scrub: smoothing > 0 ? smoothing : true,
        } });
      }
      // Keyboard navigation must never land on an unrevealed link or button.
      el.addEventListener("focusin", finish);
      const observer = splitBy === "lines" ? new ResizeObserver(() => { measure(); last.fill(-1); render(); }) : null;
      observer?.observe(textEl);
      return () => {
        tween?.kill();
        rotationTween?.kill();
        observer?.disconnect();
        el.removeEventListener("focusin", finish);
        pieces.forEach((piece, index) => {
          const saved = savedStyles[index];
          if (saved === null) piece.removeAttribute("style");
          else piece.setAttribute("style", saved);
        });
        wrappers.forEach((wrapper, index) => { wrapper.style.clipPath = savedMasks[index]; });
      };
    });
    void document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(); });
    return () => { live = false; mm.revert(); };
  }, [scrollContainerRef, text, splitBy, effect, mode, duration, highlightColor, enableBlur, baseOpacity, baseRotation, blurStrength, baseOffset, stagger, smoothing, rotationEnd, wordAnimationEnd, itemSelector]);

  return (
    <Container ref={(node) => { containerRef.current = node; }} className={`scroll-reveal ${containerClassName} ${className}`} {...restProps}>
      <TextContainer ref={(node) => { textRef.current = node; }} className={`scroll-reveal-text ${textClassName}`} aria-hidden={text === null ? undefined : true}>
        {text === null ? children : text.split(/(\s+)/).map((word, index) => word.trim() === "" ? word : (
          <span className="scroll-reveal-word" key={index}>
            {splitBy === "chars" ? Array.from(word).map((char, charIndex) => <span className="scroll-reveal-piece" key={charIndex}>{char}</span>) : <span className="scroll-reveal-piece">{word}</span>}
          </span>
        ))}
      </TextContainer>
      {text !== null ? <span className="sr-only">{text}</span> : null}
    </Container>
  );
}
