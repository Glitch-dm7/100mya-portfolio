"use client";

// Adapted from React Bits' VariableProximity for the project's TypeScript setup.
import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type RefObject,
} from "react";
import "./VariableProximity.css";

type Falloff = "linear" | "exponential" | "gaussian";

type VariableProximityProps = HTMLAttributes<HTMLSpanElement> & {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef?: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: Falloff;
  smoothing?: number;
  fromColor?: string;
  toColor?: string;
  scale?: number;
  lift?: number;
  idleWave?: boolean;
  fontSize?: number | string;
  /** Keep hover weight changes from altering the text's line breaks. */
  stabilizeLayout?: boolean;
};

function parseSettings(settings: string) {
  return new Map(
    settings.split(",").map((part) => {
      const [name, value] = part.trim().split(/\s+/);
      return [name.replace(/['"]/g, ""), Number.parseFloat(value)];
    }),
  );
}

function strengthAt(distance: number, radius: number, falloff: Falloff) {
  if (radius <= 0 || distance >= radius) return 0;
  const norm = 1 - distance / radius;
  if (falloff === "exponential") return norm * norm;
  if (falloff === "gaussian") {
    const edge = Math.exp(-2);
    return (Math.exp(-2 * (distance / radius) ** 2) - edge) / (1 - edge);
  }
  return norm;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  function VariableProximity(
    {
      label,
      fromFontVariationSettings = "'wght' 400, 'opsz' 9",
      toFontVariationSettings = "'wght' 1000, 'opsz' 40",
      containerRef,
      radius = 50,
      falloff = "linear",
      smoothing = 0.2,
      fromColor,
      toColor,
      scale = 1,
      lift = 0,
      idleWave = false,
      fontSize,
      stabilizeLayout = false,
      className = "",
      style,
      ...restProps
    },
    ref,
  ) {
    const rootRef = useRef<HTMLSpanElement | null>(null);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const setRoot = useCallback((node: HTMLSpanElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, [ref]);
    const axes = useMemo(() => {
      const to = parseSettings(toFontVariationSettings);
      return Array.from(parseSettings(fromFontVariationSettings), ([axis, from]) => ({
        axis,
        from,
        to: to.get(axis) ?? from,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    useLayoutEffect(() => {
      if (!stabilizeLayout) return;
      const root = rootRef.current;
      if (!root) return;
      const letters = letterRefs.current.filter((letter): letter is HTMLSpanElement => Boolean(letter));
      let frame = 0;
      let live = true;

      const measure = () => {
        frame = 0;
        if (!live) return;
        const settings = letters.map((letter) => letter.style.fontVariationSettings);
        // Measure at rest, even when resizing while the pointer is over the text.
        letters.forEach((letter) => {
          letter.style.width = "";
          letter.style.fontVariationSettings = fromFontVariationSettings;
        });
        const widths = letters.map((letter) => getComputedStyle(letter).width);
        letters.forEach((letter, index) => {
          letter.style.width = widths[index];
          letter.style.fontVariationSettings = settings[index];
        });
      };
      const queueMeasure = () => {
        if (live && !frame) frame = requestAnimationFrame(measure);
      };

      measure();
      // Re-measure after web fonts load and when responsive font sizing changes.
      void document.fonts.ready.then(queueMeasure);
      document.fonts.addEventListener("loadingdone", queueMeasure);
      window.addEventListener("resize", queueMeasure);
      return () => {
        live = false;
        cancelAnimationFrame(frame);
        document.fonts.removeEventListener("loadingdone", queueMeasure);
        window.removeEventListener("resize", queueMeasure);
        letters.forEach((letter) => { letter.style.width = ""; });
      };
    }, [stabilizeLayout, label, fromFontVariationSettings, fontSize]);

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const letters = letterRefs.current.filter((letter): letter is HTMLSpanElement => Boolean(letter));
      const levels = letters.map(() => 0);
      const pointer = { x: 0, y: 0, active: false };
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      let frame = 0;
      let lastTime = 0;
      let lastNear = -Infinity;
      let waveMix = 0;
      let visible = true;
      let disposed = false;

      const reset = () => {
        levels.fill(0);
        letters.forEach((letter) => {
          letter.style.fontVariationSettings = fromFontVariationSettings;
          letter.style.color = fromColor ?? "";
          letter.style.transform = "";
        });
      };

      const tick = (now: number) => {
        frame = 0;
        if (disposed || media.matches || !visible || document.hidden) {
          lastTime = 0;
          return;
        }
        const delta = lastTime ? Math.min(now - lastTime, 64) : 16;
        lastTime = now;
        // Read layout before writing styles to avoid per-letter layout thrashing.
        const rects = letters.map((letter) => letter.getBoundingClientRect());
        const area = (containerRef?.current ?? root).getBoundingClientRect();
        const dx = Math.max(area.left - pointer.x, 0, pointer.x - area.right);
        const dy = Math.max(area.top - pointer.y, 0, pointer.y - area.bottom);
        const nearby = pointer.active && dx * dx + dy * dy < radius * radius;
        const targets = rects.map((rect) => nearby
          ? strengthAt(Math.hypot(pointer.x - rect.left - rect.width / 2, pointer.y - rect.top - rect.height / 2), radius, falloff)
          : 0);
        const nearAny = targets.some((target) => target > 0);
        if (nearAny) lastNear = now;
        const waveGoal = idleWave && !nearAny && now - lastNear > 500 ? 1 : 0;
        waveMix += (waveGoal - waveMix) * (1 - Math.exp(-delta / 600));
        if (Math.abs(waveGoal - waveMix) < 0.002) waveMix = waveGoal;
        const ease = smoothing > 0 ? 1 - Math.exp(-delta / (smoothing * 400)) : 1;
        let settling = false;

        letters.forEach((letter, index) => {
          const rect = rects[index];
          const phase = ((rect.left - area.left + (rect.top - area.top) * 0.6) / Math.max(220, area.width * 0.85) - now / 3200) * Math.PI * 2;
          const wave = waveMix * 0.7 * ((1 + Math.cos(phase)) / 2) ** 2.2;
          const target = Math.max(targets[index], wave);
          let next = levels[index] + (target - levels[index]) * ease;
          if (Math.abs(target - next) < 0.002) next = target;
          else settling = true;
          if (next === levels[index]) return;
          levels[index] = next;
          letter.style.fontVariationSettings = next === 0 ? fromFontVariationSettings : axes
            .map(({ axis, from, to }) => `'${axis}' ${from + (to - from) * next}`).join(", ");
          if (fromColor || toColor) {
            letter.style.color = next === 0 ? fromColor ?? "" : `color-mix(in oklab, ${fromColor ?? "currentColor"} ${(1 - next) * 100}%, ${toColor ?? "currentColor"})`;
          }
          if (scale !== 1 || lift !== 0) {
            letter.style.transform = next === 0 ? "" : `translateY(${-lift * next}em) scale(${1 + (scale - 1) * next})`;
          }
        });
        if (settling || waveMix > 0 || (idleWave && !nearAny)) frame = requestAnimationFrame(tick);
        else lastTime = 0;
      };

      const schedule = () => {
        if (!disposed && !media.matches && !frame) frame = requestAnimationFrame(tick);
      };
      const move = (event: PointerEvent) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true;
        schedule();
      };
      const leave = () => {
        pointer.active = false;
        schedule();
      };
      const motionChange = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
        waveMix = 0;
        reset();
        schedule();
      };
      const observer = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        schedule();
      });
      observer.observe(root);
      reset();
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerup", leave);
      window.addEventListener("pointercancel", leave);
      window.addEventListener("blur", leave);
      document.documentElement.addEventListener("pointerleave", leave);
      window.addEventListener("scroll", schedule, { capture: true, passive: true });
      window.addEventListener("resize", schedule);
      document.addEventListener("visibilitychange", schedule);
      media.addEventListener("change", motionChange);
      void document.fonts.ready.then(schedule);
      schedule();
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", leave);
        window.removeEventListener("pointercancel", leave);
        window.removeEventListener("blur", leave);
        document.documentElement.removeEventListener("pointerleave", leave);
        window.removeEventListener("scroll", schedule, { capture: true });
        window.removeEventListener("resize", schedule);
        document.removeEventListener("visibilitychange", schedule);
        media.removeEventListener("change", motionChange);
      };
    }, [axes, containerRef, radius, falloff, smoothing, fromColor, toColor, scale, lift, idleWave, fontSize, label, fromFontVariationSettings]);

    let letterIndex = 0;
    const words = label.split(" ");
    return (
      <span ref={setRoot} className={`variable-proximity ${className}`} style={{ fontSize, ...style }} {...restProps}>
        {words.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            <span className="variable-proximity__word" aria-hidden="true">
              {Array.from(word).map((letter) => {
                const index = letterIndex++;
                return (
                  <span key={index} className="variable-proximity__letter" ref={(node) => { letterRefs.current[index] = node; }} style={{ fontVariationSettings: fromFontVariationSettings, color: fromColor }}>
                    {letter}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);

export default VariableProximity;
